const db = require('../config/db');

// utils
const isValidDate = (s) => /^\d{4}-\d{2}-\d{2}$/.test(String(s));
const normalizeTime = (t) => {
    t = String(t);
    if (/^\d{2}:\d{2}$/.test(t)) return t + ':00';
    if (/^\d{2}:\d{2}:\d{2}$/.test(t)) return t;
    return null;
};

exports.read = async (req, res) => {
    const { id } = req.params;
    try {
        // code
        const [rows] = await db.execute('SELECT s.showtime_id, s.movie_id, m.title, s.show_date, s.show_time, s.available_seats FROM showtimes s JOIN movies m ON m.movie_id = s.movie_id WHERE s.showtime_id = ?', [id]);

        if (rows.length === 0) {
            return res.status(404).json({
                success: false,
                error: 'Showtime not found'
            });
        }

        res.json({
            success: true,
            movie: rows[0]
        })
    } catch (err) {
        // error
        console.log(err);
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
}

exports.list = async (req, res) => {
    try {
        const { movie_id, date } = req.query;
        let sql = `
      SELECT s.showtime_id, s.movie_id, m.title, s.show_date, s.show_time, s.available_seats
      FROM showtimes s
      JOIN movies m ON m.movie_id = s.movie_id
      WHERE 1=1
    `;
        const params = [];
        if (movie_id) { sql += ' AND s.movie_id = ?'; params.push(movie_id); }
        if (date) { sql += ' AND s.show_date = ?'; params.push(date); }

        sql += ' ORDER BY s.show_date, s.show_time';
        const [rows] = await db.execute(sql, params);

        return res.json({ 
            success: true, 
            count: rows.length, 
            showtimes: rows 
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ 
            success: false, 
            error: 'Server Error' 
        });
    }
}

exports.create = async (req, res) => {
    try {
        let { movie_id, show_date, show_time, available_seats } = req.body;

        if (!movie_id || !show_date || !show_time) {
            return res.status(400).json({
                success: false,
                error: 'movie_id, show_date, show_time are required'
            });
        }

        if (!isValidDate(show_date)) {
            return res.status(400).json({
                success: false,
                error: 'show_date must be YYYY-MM-DD'
            });
        }

        const timeNorm = normalizeTime(show_time);

        if (!timeNorm) {
            return res.status(400).json({
                success: false,
                error: 'show_time must be HH:MM or HH:MM:SS'
            });
        }

        const seats = (available_seats === undefined || available_seats === null) ? 50 : Number(available_seats);

        if (Number.isNaN(seats) || seats < 0) {
            return res.status(400).json({
                success: false,
                error: 'available_seats must be a non-negative number'
            });
        }

        // ตรวจว่ามีหนังอยู่จริง
        const [m] = await db.execute('SELECT movie_id FROM movies WHERE movie_id = ? LIMIT 1', [movie_id]);
        if (m.length === 0) {
            return res.status(404).json({
                success: false,
                error: 'Movie not found'
            });
        }

        // กันเวลาซ้ำของหนังเรื่องเดียวกัน
        const [dupe] = await db.execute(
            'SELECT showtime_id FROM showtimes WHERE movie_id = ? AND show_date = ? AND show_time = ? LIMIT 1',
            [movie_id, show_date, timeNorm]
        );
        if (dupe.length > 0) {
            return res.status(409).json({
                success: false,
                error: 'Showtime already exists for this movie at that date/time'
            });
        }

        const [result] = await db.execute(
            'INSERT INTO showtimes (movie_id, show_date, show_time, available_seats) VALUES (?, ?, ?, ?)',
            [movie_id, show_date, timeNorm, seats]
        );

        return res.status(201).json({
            success: true,
            message: 'Showtime created successfully',
            showtime: {
                showtime_id: result.insertId,
                movie_id,
                show_date,
                show_time: timeNorm,
                available_seats: seats
            }
        });
    } catch (err) {
        // error
        console.log(err);
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
}

exports.update = async (req, res) => {
    const { id } = req.params;
    let { movie_id, show_date, show_time, available_seats } = req.body;

    try {
        const sets = [];
        const params = [];

        if (movie_id !== undefined) {
            const [m] = await db.execute('SELECT movie_id FROM movies WHERE movie_id = ? LIMIT 1', [movie_id]);
            if (m.length === 0) return res.status(404).json({
                success: false,
                error: 'Movie not found'
            });
            sets.push('movie_id = ?'); params.push(movie_id);
        }
        if (show_date !== undefined) {
            if (!isValidDate(show_date)) return res.status(400).json({
                success: false,
                error: 'show_date must be YYYY-MM-DD'
            });
            sets.push('show_date = ?'); params.push(show_date);
        }
        if (show_time !== undefined) {
            const timeNorm = normalizeTime(show_time);
            if (!timeNorm) return res.status(400).json({
                success: false,
                error: 'show_time must be HH:MM or HH:MM:SS'
            });
            sets.push('show_time = ?'); params.push(timeNorm);
        }
        if (available_seats !== undefined) {
            const seats = Number(available_seats);
            if (Number.isNaN(seats) || seats < 0) {
                return res.status(400).json({
                    success: false,
                    error: 'available_seats must be a non-negative number'
                });
            }
            sets.push('available_seats = ?'); params.push(seats);
        }

        if (sets.length === 0) {
            return res.status(400).json({
                success: false,
                error: 'Nothing to update'
            });
        }

        const [result] = await db.execute(
            `UPDATE showtimes SET ${sets.join(', ')} WHERE showtime_id = ?`,
            [...params, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                error: 'Showtime not found'
            });
        }

        return res.json({
            success: true,
            message: 'Showtime updated successfully'
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
}

exports.remove = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await db.execute('DELETE FROM showtimes WHERE showtime_id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                error: 'Showtime not found'
            });
        }
        return res.status(200).json({
            success: true,
            message: 'Showtime deleted successfully'
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
}
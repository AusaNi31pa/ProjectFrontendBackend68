// src/pages/Search.jsx
import React, { useState } from "react";

export default function Search() {
  const allMovies = [
    {
      title: "Avengers Endgame",
      poster: "https://i.pinimg.com/736x/bb/f7/0c/bbf70cc9a56b19eb7faf60bdf76bc99d.jpg",
      genre: "Action",
      showtime: ["10:00", "13:30", "18:00"],
    },
    {
      title: "Interstellar",
      poster: "https://i.pinimg.com/1200x/f0/0e/f4/f00ef4ef28062a3ffe32c80cfa039c86.jpg",
      genre: "Sci-Fi",
      showtime: ["11:00", "14:30", "20:00"],
    },
    {
      title: "Joker",
      poster: "https://i.pinimg.com/736x/d4/a7/87/d4a7871e8bd2460caf3bd44c9609505e.jpg",
      genre: "Drama",
      showtime: ["12:00", "15:30", "21:00"],
    },
    {
      title: "Black Widow",
      poster: "https://i.pinimg.com/1200x/ef/4b/a9/ef4ba9d82b715f949959d814a9a9b69a.jpg",
      genre: "Action",
      showtime: ["10:30", "16:00", "22:00"],
    },
  ];

  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState(allMovies);
  const [genre, setGenre] = useState("All");
  const [time, setTime] = useState("All");

  const handleSearch = () => {
    let result = allMovies;

    if (query.trim() !== "") {
      result = result.filter((m) =>
        m.title.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (genre !== "All") {
      result = result.filter((m) => m.genre === genre);
    }

    if (time !== "All") {
      result = result.filter((m) => m.showtime.includes(time));
    }

    setMovies(result);
  };

  // ✅ Generate เวลาทุก 30 นาที (10:00 → 23:00)
  const generateTimes = (start, end, interval) => {
    let times = [];
    let current = start;
    while (current <= end) {
      const hours = Math.floor(current / 60);
      const minutes = current % 60;
      const timeStr = `${String(hours).padStart(2, "0")}:${String(
        minutes
      ).padStart(2, "0")}`;
      times.push(timeStr);
      current += interval;
    }
    return times;
  };
  const showTimes = generateTimes(600, 1380, 30); // 600=10:00, 1380=23:00

  return (
    <div className="text-white font-battambang items-center flex flex-col pb-10">
      {/* Search Title */}
      <div className="px-44 pt-10 w-full">
        <h2 className="font-goldman text-4xl font-bold text-[#8F00D7] drop-shadow-[0_0_15px_rgba(143,0,215,0.9)]">
          Search
        </h2>
      </div>

      {/* Search Form - ตรงกลาง */}
      <div className="mt-8 flex gap-4 flex-wrap justify-center">
        {/* Movie Name */}
        <input
          type="text"
          placeholder="Movie Name"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="bg-gradient-to-r from-purple-900 to-indigo-900 px-4 py-2 rounded-lg w-72 focus:outline-none text-white"
        />

        {/* Genre */}
        <select
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          className="bg-gradient-to-r from-purple-900 to-indigo-900 px-4 py-2 rounded-lg w-48 focus:outline-none"
        >
          <option value="All" className="bg-black text-white">Genre</option>
          <option value="Action" className="bg-black text-white">Action</option>
          <option value="Drama" className="bg-black text-white">Drama</option>
          <option value="Comedy" className="bg-black text-white">Comedy</option>
          <option value="Sci-Fi" className="bg-black text-white">Sci-Fi</option>
          <option value="Romance" className="bg-black text-white">Romance</option>
          <option value="Thriller" className="bg-black text-white">Thriller</option>
          <option value="Horror" className="bg-black text-white">Horror</option>
          <option value="Animation" className="bg-black text-white">Animation</option>
          <option value="Fantasy" className="bg-black text-white">Fantasy</option>
        </select>

        {/* ShowTime */}
        <select
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="bg-gradient-to-r from-purple-900 to-indigo-900 px-4 py-2 rounded-lg w-48 focus:outline-none"
        >
          <option value="All" className="bg-black text-white">ShowTime</option>
          {showTimes.map((t, i) => (
            <option key={i} value={t} className="bg-black text-white">
              {t}
            </option>
          ))}
        </select>

        {/* Search Button */}
        <button
          onClick={handleSearch}
          className="bg-purple-600 px-6 py-2 rounded-lg hover:bg-purple-700"
        >
          Search
        </button>
      </div>

      {/* Movies Result */}
      <div className="px-10 mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-5xl">
        {movies.length > 0 ? (
          movies.map((movie, i) => (
            <div key={i} className="flex flex-col items-center">
              <img
                src={movie.poster}
                alt={movie.title}
                className="w-44 h-64 object-cover rounded-lg shadow-lg hover:scale-105 transition"
              />
              <p className="mt-2 text-sm">{movie.title}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-400 col-span-4 text-center">No movies found</p>
        )}
      </div>
    </div>
  );
}
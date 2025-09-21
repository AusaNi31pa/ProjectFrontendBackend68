const express = require('express');
const router = express.Router();

const { read, list, create, update, remove, search } = require('../controllers/movie');
// middleware
const { auth } = require('../middleware/auth');

// http://localhost:5000/api/movie
router.get('/movie/search', auth, search);

router.get('/movie', list);

router.get('/movie/:id', read);

router.post('/movie', create);

router.put('/movie/:id', update);

router.delete('/movie/:id', remove);


module.exports = router;
const express = require('express');
const games = require('../config');
const router = new express.Router();

/* GET games page. */
router.get('/', function(req, res, next) {
  res.render('games', { title: 'Games', gamesArr: games });
});

module.exports = router;

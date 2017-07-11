const express = require('express');
const games = require('../../games50.json');
const router = new express.Router();

/* GET games page. */
router.get('/', function(req, res, next) {
  res.render('games', { title: 'Games', gamesArr: games });
});

module.exports = router;

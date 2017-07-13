const express = require('express');
const mongo = require('../mongodb');
const router = new express.Router();
const data = mongo.database;

console.log(data);
/* GET games page. */
router.get('/', function(req, res, next) {
  res.render('games', { title: 'Games', gamesArr: data });
});

module.exports = router;

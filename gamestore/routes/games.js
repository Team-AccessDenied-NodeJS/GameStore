const express = require('express');
const router = new express.Router();

/* GET games page. */
router.get('/', function(req, res, next) {
  res.render('games', { title: 'Games' });
});

module.exports = router;

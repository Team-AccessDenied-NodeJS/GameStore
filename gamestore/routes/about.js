const express = require('express');
const router = new express.Router();

/* GET about listing. */
router.get('/', function(req, res, next) {
  res.render('about', { title: 'About' });
});

module.exports = router;

const express = require('express');
const mongo = require('../mongodb');
const router = new express.Router();

const async = () => {
  return Promise.resolve();
};

/* GET games page. */
const init = (data)=> {
router.get('/', function(req, res, next) {
   const games = { data }.data();

  res.render('games', { title: 'Games', gamesArr: games });
});
};

module.exports = {
  router, init,
};

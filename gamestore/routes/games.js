const express = require('express');
const mongo = require('../db/mongodb');
const router = new express.Router();

const async = () => {
  return Promise.resolve();
};

/* GET games page. */
const init = (data)=> {
  router.get('/', function(req, res, next) {
    res.render('games', { title: 'Games', gamesArr: data });
  });
};

module.exports = {
  router, init,
};

const MongoClient = require('mongodb').MongoClient;
const json = require('../games50.json');

const init = ()=> {
  return MongoClient.connect('mongodb://localhost/gamestore');
};

module.exports = { init };

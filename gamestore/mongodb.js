const MongoClient = require('mongodb').MongoClient;
const json = require('../games50.json');

MongoClient.connect('mongodb://localhost:27017/gamestore', function(err, db) {
  if (err) throw err;

  db.collection('arcade').insert(json);
});

module.exports = MongoClient;

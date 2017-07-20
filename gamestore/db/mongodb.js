const MongoClient = require('mongodb').MongoClient;
// const json = require('../games50.json');

const init = (connection)=> {
  return MongoClient.connect(connection);
};

module.exports = { init };

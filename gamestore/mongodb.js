const MongoClient = require('mongodb').MongoClient;
const json = require('../games50.json');
let database;


  MongoClient.connect('mongodb://localhost/gamestore', function(err, db) {
   db.collection('gamestore').find().toArray(function(error, result) {
    if (error) throw error;


     database = result;
  });
  });

// /MongoClient.connect('mongodb://localhost/gamestore', function(err, db) {
	// if (err) throw err;

	// db.collection('gamestore').insert(json);

	/* db.collection('gamestore').find().toArray(function(error, result) {
		if (error) throw error;

	
	database = result;
	});
});*/

// 	db.collection('gamestore').find(), (err, result) => {
// 		database = result;
// })

/* setTimeout(function() {*/
/* module.exports = {
MongoClient: MongoClient,
// database: database,
};*/
// }, 1000);

module.exports = {
MongoClient: MongoClient,
database: database,
};


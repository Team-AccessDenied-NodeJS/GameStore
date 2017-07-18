let collection;

const init = (db) => {
   collection = db.collection('gamestore').find().toArray();
   return collection;
};


module.exports = { init };

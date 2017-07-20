const DataBase = require('../db/dbClass');

const init = (db) => {
    return Promise.resolve({
        database: new DataBase(db),
    });
};

module.exports = { init };

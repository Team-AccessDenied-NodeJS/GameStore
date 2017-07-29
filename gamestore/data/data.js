const UsersData = require('./users.data');
const GameData = require('./games.data');

const init = (db) => {
    return Promise.resolve({
        games: new GameData(db),
        users: new UsersData(db),
    });
};

module.exports = { init };

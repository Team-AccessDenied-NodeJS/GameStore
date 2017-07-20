const app = require('../app');

const attachTo = () =>{
    const index = require('./routes/index');
    const users = require('./routes/users');
    const games = require('./routes/games');
    const about = require('./routes/about');

    app.use('/', index);
    app.use('/users', users);
    app.use('/games', games.router);
    app.use('/about', about);
};

module.exports = attachTo;

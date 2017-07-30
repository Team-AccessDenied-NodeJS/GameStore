const attachTo = (app, data) => {
    const controller = require('./controller').init(data);

    app.get('/games', (req, res) => {
        return controller.getGames(req, res);
    });

    app.get('/search', (req, res) => {
        return controller.search(req, res);
    });

    // app.post('/games', (req, res) => {
    //     return controller.addGame(req, res);
    // });
};

module.exports = { attachTo };

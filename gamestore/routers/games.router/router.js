const attachTo = (app, data) => {
    const controller = require('./controller').init(data);

    // app.get('/games', (req, res) => {
    //     // auth
    //     return controller.getAll(req, res);
    // });

    app.get('/games', (req, res) => {
        // auth
        return res.render('games', { title: 'Games', gamesArr: [{"title": "Batman", "price":"1000" }] });
    });

    app.get('/games/form', (req, res) => {
        return res.render('games/form');
    });

    app.post('/games', (req, res) => {
        const game = req.body;

        // validate item
        return data.items.create(game)
            .then((dbGame) => {
                return res.redirect('/games');
            })
            .catch((err) => {
                // connect-flash
                req.flash('error', err);
                return res.redirect('/games/form');
            });
    });
};

module.exports = { attachTo };

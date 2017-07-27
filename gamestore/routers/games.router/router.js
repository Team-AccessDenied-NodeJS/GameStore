const attachTo = (app, data) => {
    app.get('/games', (req, res) => {
        const arr = data.games.getAll();
        arr.then((result)=>{
        // auth
            return res.render('games', { title: 'Games',
                gamesArr: result, user: req.user });
        });
    });

    app.get('/search', (req, res) => {
        const request = req.query.text;
        const arr = data.games.filterBy(
            {
                 title: { $regex: `.*${request}.*` },
            }
        );
        arr.then((result)=>{
        // auth
            return res.render('search', { title: 'Games',
                gamesArr: result, user: req.user });
        });
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

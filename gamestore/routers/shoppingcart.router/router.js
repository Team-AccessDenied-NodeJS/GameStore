const attachTo = (app, data) => {
    const controller = require('../auth.router/controller').init(data);

    app.get('/shopping-cart', function(req, res) {
        if (req.user) {
                const array = [];
                const list = req.user.shoppinglist;
                list.forEach(function(game) {
                    array.push(JSON.parse(game));
                });
                return res.render('shopping-cart',
                    { user: req.user, list: array });
            }
        return controller.getSignInForm(req, res);
    });
    app.post('/add-to-cart', function(req, res) {
        if (req.user) {
            const game = req.body.game;
            req.user.shoppinglist.push(game);
            data.users.updateById(req.user);
            return res.redirect('/games');
        }
        return controller.getSignInForm(req, res);
    });

    app.post('/buy', function(req, res) {
        console.log('inside buy');
        if (req.user) {
            const game = req.body.game;
            const index = req.user.shoppinglist.indexOf(game);
            console.log(index);
            console.log(req.user.shoppinglist[index]);
            if (index > -1) {
                req.user.shoppinglist.splice(index, 1);
            }
            data.users.updateById(req.user);
            return res.redirect('/shopping-cart');
        }
        return controller.getSignInForm(req, res);
    });
};

module.exports = { attachTo };

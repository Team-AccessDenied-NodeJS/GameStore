const attachTo = (app, data) => {
    const authController = require('../auth.router/controller').init(data);
    const controller = require('./controller').init(data, authController);

    app.get('/shopping-cart', function(req, res) {
       return controller.getShoppingCart(req, res);
    });
    app.post('/add-to-cart', function(req, res) {
        return controller.addToCart(req, res);
    });

    app.post('/buy', function(req, res) {
        return controller.buy(req, res);
    });
};

module.exports = { attachTo };

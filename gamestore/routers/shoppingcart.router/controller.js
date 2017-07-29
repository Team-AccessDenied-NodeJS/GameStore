class ShoppingCartController {
    constructor(data, controller) {
        this.data = data;
        this.controller = controller;
    }

    getShoppingCart(req, res) {
         if (req.user) {
                const array = [];
                const list = req.user.shoppinglist;
                list.forEach(function(game) {
                    array.push(JSON.parse(game));
                });
                return res.render('shopping-cart',
                    { user: req.user, list: array });
            }
        return this.controller.getSignInForm(req, res);
    }
    addToCart(req, res) {
        if (req.user) {
            const game = req.body.game;
            req.user.shoppinglist.push(game);
            this.data.users.updateById(req.user);
            return res.redirect('/games');
        }
        return this.controller.getSignInForm(req, res);
    }
    buy(req, res) {
        console.log('inside buy');
        if (req.user) {
            const game = req.body.game;
            const index = req.user.shoppinglist.indexOf(game);
            console.log(index);
            console.log(req.user.shoppinglist[index]);
            if (index > -1) {
                req.user.shoppinglist.splice(index, 1);
            }
            this.data.users.updateById(req.user);
            return res.redirect('/shopping-cart');
        }
        return this.controller.getSignInForm(req, res);
    }
}

const init = (data, controller) => {
    return new ShoppingCartController(data, controller);
};

module.exports = { init };

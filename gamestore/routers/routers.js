/* globals __dirname */

const fs = require('fs');
const path = require('path');

const attachTo = (app, data) => {
    const controller = require('./auth.router/controller').init(data);

    app.get('/', (req, res) => {
         if (req.user) {
                return controller.getAuthenticatedForm(req, res);
            }
        return res.render('index');
    });

    app.get('/log-out', function(req, res) {
        // req.user.shoppinglist.push({ title: 'game', price: 200 });
        // console.log(req.user.shoppingList);
        data.users.updateById(req.user);
        req.logout();
        res.redirect('/');
    });

    fs.readdirSync(__dirname)
        .filter((file) => file.includes('.router'))
        .forEach((file) => {
            const modulePath = path.join(__dirname, file);
            require(modulePath).attachTo(app, data);
        });
};

module.exports = { attachTo };


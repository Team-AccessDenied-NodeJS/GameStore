const { Router } = require('express');
const passport = require('passport');

const attachTo = (app, data) => {
    const router = new Router();

    const controller = require('./controller').init(data);
     app.get('/log-out', function(req, res) {
        // req.user.shoppinglist.push({ title: 'game', price: 200 });
        // console.log(req.user.shoppingList);
        // data.users.updateById(req.user);
        req.logout();
        res.redirect('/');
    });

   router
        .get('/authenticated', (req, res) => {
            if (req.user) {
                if (req.user.admin) {
                    return controller.getAdminArea(req, res);
                }
            }
            if (req.user) {
                return controller.getAuthenticatedForm(req, res);
            }
            return controller.getSignInForm(req, res);
        })
        .get('/sign-up', (req, res) => {
            return controller.getSignUpForm(req, res);
        })
        .get('/sign-in', (req, res) => {
            return controller.getSignInForm(req, res);
        })
        .post('/sign-up', (req, res) => {
            return controller.signUp(req, res);
        })
        .post('/sign-in', passport.authenticate('local', {
            successRedirect: '/authenticated',
            failureRedirect: '/sign-in',
            failureFlash: true,
        }));
    app.use('/', router);
};

module.exports = { attachTo };

// Questions
// how to choose category
// where and how to update the category

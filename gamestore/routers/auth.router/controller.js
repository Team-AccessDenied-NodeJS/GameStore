class TodosController {
    constructor(data) {
        this.data = data;
    }

    getAuthenticatedForm(req, res) {
        return res.render('authenticated',
                            { user: req.user,
                              users: this.data.users,
                              games: req.games });
    }
    getAdminArea(req, res) {
        return res.render('admin-area', { user: req.user });
    }
    getSignUpForm(req, res) {
        return res.render('sign-up');
    }
    getSignInForm(req, res) {
        return res.render('sign-in');
    }

    signUp(req, res) {
        console.log(req.body);
        const bodyUser = req.body;
         if ((bodyUser.password.length < 6) || (bodyUser.username.length < 3)) {
            return res.redirect('/sign-up');
         }

        this.data.users.findByUsername(bodyUser.username)
            .then((dbUser) => {
                if (dbUser) {
                    return res.redirect('/sign-up');
                }
                return this.data.users.create(bodyUser);
            })
            .then((dbUser) => {
                return res.redirect('/sign-in');
            })
            .catch((err) => {
                req.flash('error', err);
            });
        return res;
    }
}

const init = (data) => {
    return new TodosController(data);
};

module.exports = { init };

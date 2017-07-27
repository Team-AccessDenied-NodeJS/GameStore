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
        const bodyUser = req.body;
        this.data.users.findByUsername(bodyUser.username)
            .then((dbUser) => {
                if (dbUser) {
                    throw new Error('User already exists');
                }
                return this.data.users.create(bodyUser);
            })
            .then((dbUser) => {
                return res.redirect('/sign-in');
            })
            .catch((err) => {
                req.flash('error', err);
            });
    }
}

const init = (data) => {
    return new TodosController(data);
};

module.exports = { init };

class AdminController {
    constructor(data, controller) {
        this.data = data;
        this.controller = controller;
    }

    getAdminGames(req, res) {
        if (req.user) {
            if (req.user.admin) {
                return res.render('admin-games',
                    { user: req.user, games: req.games });
            }
        }
        return this.controller.getSignInForm(req, res);
    }
    addGame(req, res) {
        if (req.user) {
            if (req.user.admin) {
                console.log('add-game: '+ req.body.title);
                const game = { title: req.body.title,
                            image: req.body.image,
                            price: req.body.price };
                this.data.games.collection.insert(game);
                return res.redirect('/authenticated');
            }
        }
        return this.controller.getSignInForm(req, res);
    }
    getAdminUsers(req, res) {
        if (req.user) {
            if (req.user.admin) {
                const usersss = this.data.users.getAll();
                usersss.then((result)=> {
                return res.render('admin-users',
                                    { user: req.user,
                                    users: result,
                                    games: this.data.games });
                });
            } else {
                return this.controller.getSignInForm(req, res);
            }
        } else {
                return this.controller.getSignInForm(req, res);
            }
        return res;
    }
    makeUsersAdmin(req, res) {
        const isAdmin = !!req.body.is_admin;
        const currentUser =JSON.parse(req.body.to_user);
        console.log(currentUser._id);
        const myUser = this.data.users.findById(currentUser._id);
        myUser.then((result)=>{
            result.admin = isAdmin;
            // console.log(result);
            this.data.users.updateById(result);
            return res.redirect('/admin-users');
        });
    }
}

const init = (data, controller) => {
    return new AdminController(data, controller);
};

module.exports = { init };

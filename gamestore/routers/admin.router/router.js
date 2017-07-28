const attachTo = (app, data) => {
    const controller = require('../auth.router/controller').init(data);

    app.get('/admin-games', (req, res) => {
        if (req.user.admin) {
            return res.render('admin-games',
                { user: req.user, games: req.games });
        }
        return controller.getSignInForm(req, res);
    });

    app.post('/add-game', (req, res)=>{
        if (req.user.admin) {
            console.log('add-game: '+ req.body.title);
            const game = { title: req.body.title,
                        image: req.body.image,
                        price: req.body.price };
            data.games.collection.insert(game);
            return res.redirect('/authenticated');
        }
        return controller.getSignInForm(req, res);
    });

    app.get('/admin-users', (req, res)=>{
        if (req.user.admin) {
            const usersss = data.users.getAll();
            usersss.then((result)=> {
            return res.render('admin-users',
                                { user: req.user,
                                users: result,
                                games: data.games });
            });
        } else {
            return controller.getSignInForm(req, res);
        }
        return res;
    });

    app.post('/make-user-admin', (req, res)=>{
        const isAdmin = !!req.body.is_admin;
        const currentUser =JSON.parse(req.body.to_user);
        console.log(currentUser._id);
        const myUser = data.users.findById(currentUser._id);
        myUser.then((result)=>{
            result.admin = isAdmin;
            // console.log(result);
            data.users.updateById(result);
            return res.redirect('/admin-users');
        });
    });
};

module.exports = { attachTo };

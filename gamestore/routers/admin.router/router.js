const attachTo = (app, data) => {
    const adminController = require('../auth.router/controller').init(data);
    const controller = require('./controller').init(data, adminController);

    app.get('/admin-games', (req, res) => {
        return controller.getAdminGames(req, res);
    });

    app.post('/add-game', (req, res)=>{
        return controller.addGame(req, res);
    });

    app.get('/admin-users', (req, res)=> {
        return controller.getAdminUsers(req, res);
    });
           const props = new RegExp();
    app.post('/make-user-admin', (req, res)=>{
        return controller.makeUsersAdmin(req, res);
    });
};

module.exports = { attachTo };

class GamesController {
    constructor(data) {
        this.data = data;
    }

    getGames(req, res) {
        const arr = this.data.games.getAll();
        arr.then((result)=>{
        // auth
            return res.render('games', { title: 'Games',
                gamesArr: result, user: req.user });
        });
    }
    search(req, res) {
        const request = req.query.text;
        const arr = this.data.games.filterBy(
            {
                 title: { $regex: `.*${request}.*` },
            }
        );
        arr.then((result)=>{
        // auth
            return res.render('search', { title: 'Games',
                gamesArr: result, user: req.user });
        });
    }
    addGame(req, res) {
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

const init = (data) => {
    return new GamesController(data);
};

module.exports = { init };

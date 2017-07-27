const attachTo = (app, data) => {
    app.get('/games/:id', (req, res) => {
        const arr = data.games.findById(req.params.id);
        console.log('REQ: ' + req.params.id);
        arr.then((result)=>{
            return res.render('game', { game: result, user: req.user });
        });
    });
};

module.exports = { attachTo };

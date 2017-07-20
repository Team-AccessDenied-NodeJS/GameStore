const init = (data) => {
    const controller = {
        getAll(req, res) {
            return data.games.getAll()
                .then((items) => {
                    return res.render('games', {
                        context: items,
                    });
                });
        },
    };

    return controller;
};


module.exports = { init };

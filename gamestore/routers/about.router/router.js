const attachTo = (app, data) => {
    app.get('/about', (req, res) => {
        return res.render('about', { title: 'About', user: req.user });
    });
};

module.exports = { attachTo };

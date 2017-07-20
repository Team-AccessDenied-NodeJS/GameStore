const attachTo = (app, data) => {
    app.get('/about', (req, res) => {
        return res.render('about', { title: 'About' });
    });
};

module.exports = { attachTo };

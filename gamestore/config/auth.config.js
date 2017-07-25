const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const { Strategy } = require('passport-local').Strategy;
const flash = require('connect-flash');

const configAuth = (app, data) => {
    passport.use(new Strategy(
            (username, password, done) => {
                const loginName = data.users.findByUsername(username);
                return loginName.then((user) => {
                            if (user.password !== password) {
                                return done(null, false, { message: 'Incorrect password.' });
                            }
                            return done(null, user);
                        })
                        .catch((err)=>{
                            return done(err);
                        });
                }
        )
    );
    app.use(cookieParser());
    app.use(session({ secret: 'Access Denied' }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(flash());

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser((id, done) => {
        return data.users.findById(id)
            .then((user) => {
                done(null, user);
            })
            .catch(done);
    });
};

module.exports = configAuth;

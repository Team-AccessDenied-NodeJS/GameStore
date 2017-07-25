const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const { Strategy } = require('passport-local').Strategy;

const configAuth = (app, data) => {
    passport.use(new Strategy(
            (username, password, done) => {
                const loginName = data.users.findByUsername(username);
                return loginName.then((user) => {
                            if (user.password !== password) {
                                done(new Error('Invalid Password'));
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

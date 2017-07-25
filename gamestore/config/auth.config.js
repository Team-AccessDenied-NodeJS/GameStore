const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const { Strategy } = require('passport-local').Strategy;

const configAuth = (app, users) => {
passport.use(new Strategy(
  (username, password, done) => {
    return users.findByUsername(username)
        .than((user) => {
            return done(null, user);
        })
        .catch((err)=>{
            return done(err);
        });
  }
));
  app.use(cookieParser());
  app.use(session({ secret: 'Access Denied' }));
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
    return users.findById(id)
        .than((user) => {
            done(null, user);
        })
        .catch(done);
  
});

};

module.exports = configAuth;

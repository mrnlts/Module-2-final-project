const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/User.model');

const customFields = {
  usernameField: 'email', 
  passwordField: 'password'
}

const verifyCallback = (username, password, done) => {
  User.findOne({ email: username })
    .then(user => {
      if (!user) {
        done(null, false, { message: 'Incorrect user or password' });
      }
      if (bcrypt.compareSync(password, user.passwordHash)) {
        return done(null, user);
      }
      return done(null, false, { errorMessage: 'Incorrect user or password' });
    })
};

const strategy = new LocalStrategy(customFields, verifyCallback);

passport.use(strategy);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((userId, done) => {
  User.findById(userId)
    .then((dbUser) => {
      done(null, dbUser);
    })
    .catch(err = done(err))
})

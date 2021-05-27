const passport = require('passport');
const session = require('express-session');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const appSession = require('./session');
const User = require('../models/User.model');

module.exports = app => {
  passport.serializeUser((user, done) => done(null, user.id));

  passport.deserializeUser((id, done) => {
    User.findById(id)
      .then(user => done(null, user))
      .catch(err => done(err));
  });

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.CALLBACK_URL,
      },

      async (req, accessToken, refreshToken, profile, done) => {
        console.log('Google account details:', profile);
        console.log("ACCESS TOKEN ===========> ", accessToken);
        console.log("REFRESH TOKEN ===============> ", refreshToken);
        console.log("PROFILE =============> ", profile);
        try {
          const user = await User.findOne({ googleID: profile.id });
          if (user) {
            done(null, user);
          } else {
            const newUser = await User.create({ googleID: profile.id });
            done(null, newUser);
          }
        } catch (e) {
          done(e);
        }
      },
    ),
  );

  
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(session(appSession));
};

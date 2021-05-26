const passport = require('passport');
const session = require('express-session');
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const appSession = require('./session');
const User = require('../models/User.model');


module.exports = (app) => {
  
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
        clientSecret:process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK, 
      },
      
      (req, accessToken, refreshToken, profile, done) => {
       console.log("Google account details:", profile);
               
        User.findOne({ googleID: profile.id })
          .then(user => {
            if (user) {
              done( null, user);
              return;
            }
   
            User.create({ googleID: profile.id })
              .then(newUser => {
                done(null, newUser);
              })
              .catch(err => done(err)); 
          })
          .catch(err => done(err));
      }
    )
  );

app.use(session(appSession)); 
app.use(passport.initialize());
app.use(passport.session()); 

}



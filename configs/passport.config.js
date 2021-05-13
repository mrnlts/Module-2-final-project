// const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;
// const bcrypt = require('bcrypt');
// const session = require('express-session');
// const flash = require('connect-flash');
// const appSession = require('./session');
// const User = require('../models/User.model');


// module.exports = (app) => {

//   passport.serializeUser((user, done) => done(null, user.id));
 
//   passport.deserializeUser((id, done) => {
//     User.findById(id)
//       .then(user => done(null, user))
//       .catch(err => done(err));
//   });
   
// app.use(flash());

// passport.use(
//   new LocalStrategy(
//     { passReqToCallback: true },
//     {
//       usernameField: 'email',
//       passwordField: 'password',
//     },

//     ( username, password, done) => {
//       User.findOne({  email: username })
//         .then(user => {
//           if (!user) {
//             done(null, false, { message: 'Incorrect user or password' });
//           } 
//           if (bcrypt.compareSync(password, user.password)) {
//             return done(null, user);
//           } 
   
//           return done(null, false, { errorMessage:  'Incorrect user or password' })
          
//         })
//         .catch(err => done(err));
//     },
//   ),
// );

// app.use(session(appSession));
// app.use(passport.initialize());
// app.use(passport.session());

// }


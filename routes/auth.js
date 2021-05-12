const express = require('express');

const router = express.Router();
// const bcryptjs = require('bcryptjs');
const passport = require('passport');
// const User = require('../models/User.model');

router.get('/login', (req, res) => res.render('auth/login', {message: req.flash('success')}));

router.post('/logout', (req, res) => {
  req.session.destroy(() => res.render('index'))
});

router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/index',
    failureRedirect: '/login'
  })
);

// router.post('/login', (req, res, next) => {
//   console.log('SESSION =====> ', req.session);
//   const { email, password } = req.body;
//   passport.authenticate('local', (err, dbUser, failureDetails) => {
//     if (email === '' || password === '') {
//       return res.render('auth/login'); // Flash error
//     }
 
//     if (!dbUser) {
//       // Unauthorized, `failureDetails` contains the error messages from our logic in "LocalStrategy" {message: '…'}.
//       return res.render('auth/login', { errorMessage: 'Wrong password or username' });      
//     }
 
//     // save user in session: req.user
//     req.session.currentUser = dbUser
//     const link = `/user/${dbUser.id}`;
    
//     req.login(dbUser, err => {
//       if (err) { // possar error en auth de password ?¿?¿?¿?
//         res.render('auth/login', { errorMessage: 'Incorrect password.' });
//         return next(err);
//       }
 
//       // All good, we are now logged in and `req.user` is now set
//       res.redirect(link);
  
//     });
//   })(req, res, next);
// });

 
module.exports = router;

const express = require('express');

const router = express.Router();
const bcryptjs = require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User.model');

router.get('/login', (req, res) => res.render('auth/login', { message: req.flash('success') }));

router.post('/logout', (req, res) => {
  req.session.destroy(() => res.render('index'));
});

router.post('/login', (req, res, next) => {
  
  console.log('SESSION =====> ', req.session);
  console.log("req.user = ", req.session.passport.user)

  const { email, password } = req.body;
  User.find({email})
    .then((dbUser)=> {
      passport.authenticate('local', () => {
        console.log("dbUser = ", dbUser)
        if (email === '' || password === '') {
           res.render('auth/login' , {errorMessage: "You have to fill all the fields"}); 
        } else if (!dbUser) {
           return res.render('auth/login', { errorMessage: 'Wrong password or username' });
        } else {
        req.login(dbUser, err => {
          if (err) { 
            res.render('auth/login', { errorMessage: 'Incorrect password.' });
            return next(err);
          }
      
          res.redirect("/");
        });
        }
       
      })(req, res, next);
    })
  
});

module.exports = router;

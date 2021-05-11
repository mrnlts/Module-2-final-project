const express = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/User.model');
const Business = require('../models/Business.model');

const router = express.Router();

router.get('/login', (req, res) => res.render('auth/login'));

router.post('/logout', (req, res, next) => {
  req.session.destroy(() => res.render('index'))
});

router.post('/login', (req, res, next) => {
  console.log('SESSION =====> ', req.session);
  const { email, password } = req.body;
  if (email === '' || password === '') {
    return res.render('auth/login'); // Flash error
  }
 
  User.findOne({ email })
    .then(dbUser => {
      if (dbUser) {
        if (bcryptjs.compareSync(password, dbUser.passwordHash)) {
          req.session.currentUser = dbUser
          const link = `/user/${dbUser.id}`;
          res.redirect(link);
        } else {
          res.render('auth/login', { errorMessage: 'Incorrect password.' });
        }
      } else {
        Business.findOne({ email })
        .then(dbBusiness => {
          if (!dbBusiness) {
          res.render('auth/login', { error: 'Email is not registered. Try with other email.' });
          } else if (bcryptjs.compareSync(password, dbBusiness.passwordHash)) {
            req.session.currentUser = dbBusiness
            const link = `/business/${dbBusiness.id}`;
            res.redirect(link);
          } else {
            res.render('auth/login', { errorMessage: 'Incorrect password.' });
          }
        });
      }
    })
    .catch(error => {
      next(error);
    });
});

module.exports = router;

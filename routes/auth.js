const express = require('express');

const router = express.Router();
const bcryptjs = require('bcryptjs');
const User = require('../models/User.model');

router.get('/login', (req, res) => res.render('auth/login', {message: req.flash('success')}));

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
      }
    })
    .catch(error => {
      next(error);
    });
});

module.exports = router;

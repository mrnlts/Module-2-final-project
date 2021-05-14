const express = require('express');

const router = express.Router();
const bcryptjs = require('bcryptjs');
const User = require('../models/User.model');

const saltRounds = 10;

router.get('/login', (req, res) => res.render('auth/login', { message: req.flash('success') }));

router.post('/logout', (req, res, next) => {
  req.session.destroy(() => res.render('index'));
});

router.post('/login', (req, res, next) => {
  const { email, password } = req.body;
  if (email === '' || password === '') {
    return res.render('auth/login'); // Flash error
  }

  User.findOne({ email })
    .then(dbUser => {
      if (dbUser) {
        if (bcryptjs.compareSync(password, dbUser.passwordHash)) {
          req.session.currentUser = dbUser;
          res.redirect(`/user/profile`);
        } else {
          res.render('auth/login', { errorMessage: 'Incorrect password.' });
        }
      }
    })
    .catch(error => next(error));
});

/* GET signup  */
router.get('/signup', (req, res) => res.render('signup/user'));

/* POST signup  */
router.post('/signup', (req, res, next) => {
  const { firstName, lastName, email, password, city, age } = req.body;

  bcryptjs
    .genSalt(saltRounds)
    .then(salt => bcryptjs.hash(password, salt))
    .then(hashedPassword => User.create({ firstName, lastName, email, passwordHash: hashedPassword, city, age }))
    .then(dbUser => {
      req.session.currentUser = dbUser;
      req.flash('success', 'Registration successfully');
      res.redirect('/user/profile');
    })
    .catch(error => next(error));
});

module.exports = router;

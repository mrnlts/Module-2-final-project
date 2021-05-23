const express = require('express');

const router = express.Router();
const bcryptjs = require('bcryptjs');
const User = require('../models/User.model');
const isUserLoggedOut = require('../middleware/logout');

const saltRounds = 10;

router.get('/login', isUserLoggedOut, (req, res) => {
  res.render('auth/login', { errorMessage: [ req.flash("wrongPassw"), req.flash("blank"),req.flash("unknown") ] });
});

router.post('/logout', (req, res, next) => {
  req.session.destroy(() => res.redirect('/'));
});

router.post('/login', (req, res, next) => {
  const { email, password } = req.body;
   if (email === '' || password === '') {
    req.flash('blank', 'You have to fill all the fields');
    return res.redirect('/auth/login'); 
  }

  User.findOne({ email })
    .then(dbUser => {
      if (dbUser) {
        if (bcryptjs.compareSync(password, dbUser.passwordHash)) {
          req.session.currentUser = dbUser;
          res.redirect(`/user/profile`);
        } else {
          req.flash('wrongPassw', 'Incorrect password');
          res.redirect('/auth/login');
        }
      } else {
        req.flash('unknown', 'Wrong password or username');
      res.redirect('/auth/login');
    }
    })
    .catch(error => next(error));
});

/* GET signup  */
router.get('/signup', isUserLoggedOut, (req, res) => res.render('signup/user'));

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

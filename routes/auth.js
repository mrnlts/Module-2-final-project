const express = require('express');

const router = express.Router();
const bcryptjs = require('bcryptjs');
const User = require('../models/User.model');
const isUserLoggedOut = require('../middleware/logout');
const notifications = require('../middleware/notifications');

const saltRounds = 10;

router.get('/login', isUserLoggedOut, notifications, (req, res) => {
  res.render('auth/login', { errorMessage: [req.flash('wrongPassw'), req.flash('blank'), req.flash('unknown')] });
});

router.post('/logout', (req, res, next) => {
  req.session.destroy(() => res.redirect('/'));
});

router.post('/login', async (req, res, next) => {
  const { email, password } = req.body;
  if (email === '' || password === '') {
    req.flash('blank', 'You have to fill all the fields');
    return res.redirect('/auth/login');
  }
  try {
    const dbUser = await User.findOne({ email });
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
  } catch (e) {
    res.render('error500');
    next(e);
  }
});

/* GET signup  */
router.get('/signup', isUserLoggedOut, (req, res) => {
  res.render('signup/user', { errorMessage: [req.flash('wrongPassw'), req.flash('blank'), req.flash('unknown'), req.flash('userExists')] });
});

/* POST signup  */
router.post('/signup', async (req, res, next) => {
  const { firstName, lastName, email, password, city, age } = req.body;
  if (firstName === '' || lastName === '' || email === '' || password === '' || city === '' || age === '') {
    req.flash('blank', 'You have to fill all the fields');
    return res.redirect('/auth/signup');
  }
  try {
    let dbUser = await User.findOne({ email });
    if (!dbUser) {
      const salt = await bcryptjs.genSalt(saltRounds);
      const hashedPassword = await bcryptjs.hash(password, salt);
      dbUser = await User.create({ firstName, lastName, email, passwordHash: hashedPassword, city, age });
      req.session.currentUser = dbUser;
      req.flash('success', 'Registration successfully');
      res.redirect('/user/profile');
    } else {
      req.flash('userExists', 'Email in use. Try a different one!');
      res.redirect('/auth/signup');
    }
  } catch (e) {
    res.render('error500');
    next(e);
  }  
});

module.exports = router;

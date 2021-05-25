const express = require('express');

const passport = require('passport');
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const router = express.Router();
const bcryptjs = require('bcryptjs');
const User = require('../models/User.model');
const isUserLoggedOut = require('../middleware/logout');
const notifications = require('../middleware/notifications');

const saltRounds = 10;

router.get('/login', isUserLoggedOut, notifications, (req, res) => {
  res.render('auth/login', { errorMessage: [req.flash('wrongPassw'), req.flash('blank'), req.flash('unknown')], auth:true });
});

router.post('/logout', (req, res) => {
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
  res.render('signup/user', { errorMessage: [req.flash('wrongPassw'), req.flash('weakPassw'), req.flash('blank'), req.flash('unknown'), req.flash('userExists')], auth:true });
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
      const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
      if (!regex.test(password)) {
        res.status(500);
        req.flash('weakPassw', 'Password needs to have at least 6 chars and must contain at least one number, one lowercase and one uppercase letter.' );
        res.redirect('/auth/signup');
        return;
      }
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


router.get(
  "/google",
  passport.authenticate("google", {
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email"
    ]
  })
);
router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: '/user/profile',
    failureRedirect: "/login" 
  })
);

module.exports = router;

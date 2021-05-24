const express = require('express');

const router = express.Router();
const User = require('../models/User.model');
const Business = require('../models/Business.model');
const Product = require('../models/Product.model');
const isUserLoggedIn = require('../middleware/login');

router.get('/profile', isUserLoggedIn, async (req, res, next) => {
  try {
    const dbUser = await User.findById(req.session.currentUser._id);
    const dbBusiness = await Business.find();
    const dbProducts = await Product.find();
    const isBusiness = () => {
      if (dbUser.role === 'business') {
        return true;
      }
    };
    res.render('user/mainPage', { dbUser, dbBusiness, dbProducts, isBusiness, userMainPage: true });
  } catch (e) {
    res.render('error404');
    next(e);
  }
});

// FIND CUSTOMER BY ID AND RENDER UPDATE FORM //
router.get('/profile/edit', isUserLoggedIn, async (req, res, next) => {
  try {
    const dbUser = await User.findById(req.session.currentUser._id);
    res.render('user/edit-form', { dbUser, userEdit: true });
  } catch (e) {
    res.render('error404');
    next(e);
  }
});

// UPDATE CUSTOMER DATA //
router.post('/profile/edit', async (req, res, next) => {
  const { firstName, lastName, email, city, age } = req.body;
  try {
    await User.findByIdAndUpdate(req.session.currentUser._id, { firstName, lastName, email, city, age }, { new: true });
    res.redirect('/user/profile');
  } catch (e) {
    res.render('error500');
    next(e);
  }
});

// DELETE CUSTOMER //
router.post('/delete', async (req, res, next) => {
  try {
    await User.findByIdAndRemove(req.session.currentUser._id);
    res.redirect('/');
  } catch (e) {
    res.render('error500');
    next(e);
  }
});

module.exports = router;

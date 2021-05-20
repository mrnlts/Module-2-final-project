const express = require('express');

const isUserLoggedIn = require('../middleware/login');
const Order = require('../models/Order.model');

const router = express.Router();

router.get('/', isUserLoggedIn, (req, res, next) => {
  Order.find({ user: req.session.currentUser._id })
    .populate('product')
    .populate({
      path: 'product',
      populate: [{ path: 'businessName' }],
    })
    .then(dbOrders => res.render('user/order-history', { dbOrders, successMessage: req.flash('success') }))
    .catch(err => next(err));
});

router.post('/', isUserLoggedIn, (req, res, next) => {
  Order.create({ business: req.body.businessName, product: req.body.order, user: req.session.currentUser._id })
    .then(() => {
      req.flash('success', 'Your order is confirmed');
      res.redirect('/orders');
    })
    .catch(err => next(err));
});

module.exports = router;

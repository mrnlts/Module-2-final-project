const express = require('express');

const isUserLoggedIn = require('../middleware/login');
const Order = require('../models/Order.model');

const router = express.Router();

router.get('/', isUserLoggedIn, (req, res, next) => {
  Order.find({user: req.session.currentUser._id})
    .populate('product')
    .populate({
      path: 'product',
      populate: [
        { path: 'businessName' }
      ]
    })
    .then((dbOrders) => res.render('user/order-history', {dbOrders}))
    .catch(err => next(err));
})

router.post('/', isUserLoggedIn, (req, res, next) => {
  Order.create({ product: req.body.order, user: req.session.currentUser._id })
    .then(() => res.redirect('/order')) // Make flash alert to alert from order confirmed
    .catch(err => next(err));
});

module.exports = router;

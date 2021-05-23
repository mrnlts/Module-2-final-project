const express = require('express');

const isUserLoggedIn = require('../middleware/login');
const Order = require('../models/Order.model');

const router = express.Router();

router.get('/', isUserLoggedIn, async (req, res, next) => {
  try {
    const dbOrders = await Order.find({ user: req.session.currentUser._id })
      .populate('product')
      .populate({ path: 'product', populate: [{ path: 'businessName' }] });
    res.render('user/order-history', { dbOrders, successMessage: req.flash('success') });
  } catch (e) {
    res.render('error404');
    next(e);
  }
});

router.post('/', async (req, res, next) => {
  try {
    await Order.create({
      business: req.body.businessName,
      product: req.body.order,
      user: req.session.currentUser._id,
      status: 'pending',
    });
    req.flash('success', 'Your order is confirmed');
    res.redirect('/orders');
  } catch (e) {
    res.render('error500');
    next(e);
  }
});

router.post('/:id/delivered', async (req, res, next) => {
  const { id } = req.params;
  try {
    await Order.findByIdAndUpdate(id, { status: 'delivered' });
    req.flash('deliver', 'Your order was delivered');
    res.redirect('/business/orders');
  } catch (e) {
    res.render('error500');
    next(e);
  }
});

module.exports = router;

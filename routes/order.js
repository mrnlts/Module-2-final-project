const express = require('express');

const isUserLoggedIn = require('../middleware/login');
const Order = require('../models/Order.model');

const router = express.Router();

router.get('/', isUserLoggedIn, async (req, res, next) => {
  try {
    const dbOpenOrders = await Order.find({ user: req.session.currentUser._id, status: 'open' })
      .populate('business')
      .populate({ path: 'product', populate: [{ path: 'businessName' }] });
    const dbClosedOrders = await Order.find({ user: req.session.currentUser._id, status: { $ne: 'open' } })
      .populate('business')
      .populate({ path: 'product', populate: [{ path: 'businessName' }] });
    res.render('user/order-history', {
      dbOrders: { dbOpenOrders, dbClosedOrders },
      successMessage: req.flash('success'),
      orderHistory: true,
    });
  } catch (e) {
    res.render('error404');
    next(e);
  }
});

router.get('/:id/details', isUserLoggedIn, async (req, res, next) => {
  const { id } = req.params;
  try {
    const dbOrder = await Order.findById(id)
      .populate('business')
      .populate('products.product');
    let openOrder = true;
    if (dbOrder.status !== 'open') {
      openOrder = false;
    }
    let prices = [];
    await dbOrder.products.forEach(prod => prices.push(prod.product.price*prod.amount));
    const total = await prices.reduce((acc, curr) => acc + curr);
    res.render('user/order-detail', { dbOrder, successMessage: req.flash('closed'), openOrder, total, orderDetail:true });
  } catch (e) {
    res.render('error404');
    next(e);
  }
});

router.post('/:id/confirm', isUserLoggedIn, async (req, res, next) => {
  const { id } = req.params;
  try {
    await Order.findByIdAndUpdate(id, { status: 'pending' });
    req.flash('closed', 'Your order has been sent to the restaurant!');
    res.redirect(`/orders/${id}/details`);
  } catch (e) {
    res.render('error404');
    next(e);
  }
});

router.post('/', async (req, res, next) => {
  const { product, business } = req.body;
  try {
    let dbOrders = await Order.find({ business, status: 'open', user: req.session.currentUser._id});
    if (dbOrders.length === 0) {
      dbOrders = Order.create({
        business,
        products: [{ product, amount: 1 }],
        user: req.session.currentUser._id,
        status: 'open',
      });
    } else {
      let products = [...dbOrders[0].products];
      let match = 0;
      products.forEach((prod, i) => {
        if (String(prod.product) === String (product)) {
          match = 1;
          products.splice(i, 1, {amount: 2, product});
        } 
      });
      if (match === 0) {
        await products.push({ amount: 1, product });
        return;
      }
      await Order.findByIdAndUpdate(dbOrders[0].id, { products });
    }
      req.flash('success', 'Product added to shopping cart');
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

const express = require('express');
const { NotAcceptable } = require('http-errors');

const isUserLoggedIn = require('../middleware/login');
const Order = require('../models/Order.model');

const router = express.Router();

router.get('/', isUserLoggedIn, async (req, res, next) => {
  try {
    const dbOrders = await Order.find({ user: req.session.currentUser._id }).populate('business').populate({ path: 'product', populate: [{ path: 'businessName' }] });
    // const money = dbOrders.reduce((acc, curr) => acc + curr);
      res.render('user/order-history', { dbOrders, successMessage: req.flash('success'), orderHistory: true });
  } catch (e) {
    res.render('error404');
    next(e);
  }
});

router.post('/', async (req, res, next) => {
  const { product, business } = req.body;
  try {
    let dbOrder = await Order.findOne({business});
    if (!dbOrder) {
      console.log("THERE ARE NO ORDERS IN THE SELECTED BUSINESS");
      console.log("current body request: ", req.body);
      console.log("Current product: ", product);
        dbOrder = Order.create({
        "business": business,
        "products": [{"item": product, amount: 1}],
        "user": req.session.currentUser._id,
        "status": 'pending',
      });
    } else {
      await console.log("ORDER DOES EXIST AND IT IS: ", dbOrder);
      let products = await [...dbOrder.products];
      await console.log("HERE'S A COPY OF THE CURRENT PRODUCTS IN THE ORDER: ", products, 
      "AND HERE IS THE PRODUCT THAT WE'RE ABOUT TO PUT IN IT", product);
      await products.push({"amount": 1, "item": product});
      await console.log("THIS IS WHAT THE LISH LOOKS LIKE AFTER WE PUSH THE CURRENT PRODUCT: ", products);
      const newOrder = await Order.findOneAndUpdate(business, {"products": products});
      console.log("THIS IS THE UPDATED ORDER: ", newOrder);
    }
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

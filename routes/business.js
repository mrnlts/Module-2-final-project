const express = require('express');

const router = express.Router();
const User = require('../models/User.model');
const Business = require('../models/Business.model');
const Product = require('../models/Product.model');
const Order = require('../models/Order.model');
const isBusiness = require('../middleware/business');
const fileUploader = require('../configs/cloudinary.config');


// RENDER ADD BUSINESS FORM
router.get('/add', (req, res) => res.render('business/add-business'));

// POST NEW BUSINESS TO DATABASE


router.post('/add', fileUploader.single('image'), (req, res, next) => {
  const userId = req.session.currentUser._id;
  const { businessName, businessType, city } = req.body;
  Business.create({ businessName, businessType, city, owner: userId, imageUrlBusiness: req.file.path })
    .then(() => {
      User.findByIdAndUpdate(userId, { role: 'business' }).then(() => res.redirect('/business/profile'));
    })
    .catch(err => next(err));
});

// RENDER BUSINESS HOME PAGE //
router.get('/profile', (req, res, next) => {
  const owner = req.session.currentUser._id;
  User.findById(owner)
    .then(dbUser => {
      Business.findOne({ owner: dbUser.id }).then(dbBusiness => {
        Order.find({ businessName: dbBusiness.id }).then(dbOrders => {
          res.render('business/mainPage', { dbBusiness, dbOrders });
        });
      });
    })
    .catch(err => next(err));
});

// RENDER BUSINESS PRODUCTS PAGE //
router.get('/products', (req, res, next) => {
  Business.findOne({ owner: req.session.currentUser._id })
    .then(dbBusiness => {
      Product.find({ businessName: dbBusiness }).then(dbProducts => res.render('business/products', { dbProducts }));
    })
    .catch(err => next(err));
});

// RENDER BUSINESS ORDERS PAGE //
router.get('/orders', (req, res) => {
  Business.findOne({ owner: req.session.currentUser._id }).then(dbBusiness => {
    Order.find({ business: dbBusiness.id })
      .populate('user product')
      .then(dbOrders => {
        res.render('business/orders', { dbOrders });
      });
  });
});

// RENDER BUSINESS EDIT PAGE //
router.get('/profile/edit', (req, res, next) => {
  Business.findOne({ owner: req.session.currentUser._id })
    .then(dbBusiness => res.render('business/edit-form', { dbBusiness }))
    .catch(error => next(error));
});

// UPDATE DB BUSINESS DATA //
router.post('/profile/edit', (req, res, next) => {
  const { businessName, businessType, city } = req.body;
  Business.findOneAndUpdate({ owner: req.session.currentUser._id }, { businessName, businessType, city }, { new: true })
    .then(dbBusiness => {
      console.log('BUSINESS: ', dbBusiness);
      res.redirect('/business/profile');
    })
    .catch(error => next(error));
});

// RENDER ADD PRODUCT FORM //
router.get('/add-product', (req, res) => res.render('business/add-product'));

// ADD PRODUCT TO DB //
router.post('/add-product', fileUploader.single('image'), (req, res, next) => {
  const { price, description, image } = req.body;
  console.log("req.body add prod", req.body)
  Business.findOne({ owner: req.session.currentUser._id })
    .then(dbBusiness => {
      Product.create({ businessName: dbBusiness.id, price, description, imageUrlProduct: req.file.path })
      .then(dbProduct => {
        console.log("3", req.file.path)
        res.redirect('/business/products');
      });
    })
    .catch(err => next(err));
});

// DELETE BUSINESS //
router.post('/delete', (req, res, next) => {
  User.findByIdAndUpdate(req.session.currentUser._id, { role: 'customer' })
    .then(dbUser => {
      Business.findOneAndRemove({ owner: dbUser.id })
        .then(() => res.redirect('/user/profile'))
        .catch(err => next(err));
  });
});

module.exports = router;

const express = require('express');

const router = express.Router();
const User = require('../models/User.model');
const Business = require('../models/Business.model');
const Product = require('../models/Product.model');
const Order = require('../models/Order.model');

// RENDER ADD BUSINESS FORM
router.get('/add', (req, res) => res.render('business/add-business'));
router.post('/add', (req, res, next) => {
  const userId = req.session.currentUser._id;
  const { businessName, businessType, image, city } = req.body;
  Business.create({ businessName, businessType, image, city, owner: userId })
    .then(()=> {
      User.findByIdAndUpdate(userId, { role: 'business' })
      .then(()=> res.redirect('/business/profile'))
    })   
    .catch((err)=> next(err));
});

// RENDER BUSINESS HOME PAGE //
router.get('/profile', (req, res, next) => {
  Business.findById(req.session.currentUser._id)
    .then(dbBusiness => res.render('business/mainPage', {dbBusiness}))   
    .catch(err => next(err));
});


// RENDER BUSINESS EDIT PAGE // 

router.get('/profile/edit', (req, res, next) => {
    Business.findById(id)
      .then(dbBusiness => res.render('business/edit-form', { dbBusiness }))
      .catch(error => next(error))
});
  
  // UPDATE DB BUSINESS DATA //

router.post('/profile/edit', (req, res, next) => {
  const { businessName, businessType, city, email, password  } = req.body;
  Business.findByIdAndUpdate(id, { businessName, businessType, city, email, password  }, { new: true })
    .then(() => res.redirect('/business'))
    .catch(error => next(error));
});  

// RENDER ADD PRODUCT FORM //
router.get('/:id/product', (req, res) => {
  res.render('business/add-product', {id});
});

router.post('/:id/product', (req, res, next) => {
  const {price, description} = req.body;
  Product.create({businessName: id, price, description})
    .then(()=> res.redirect('/business'))
    .catch(err => next(err));
});

module.exports = router;

const express = require('express');

const router = express.Router();
const User = require('../models/User.model');
const Business = require('../models/Business.model');
const Product = require('../models/Product.model');
const isBusiness = require('../middleware/business');

// RENDER ADD BUSINESS FORM
router.get('/add', (req, res) => res.render('business/add-business'));

// POST NEW BUSINESS TO DATABASE
router.post('/add', (req, res, next) => {
  const userId = req.session.currentUser._id;
  const { businessName, businessType, image, city } = req.body;
  Business.create({ businessName, businessType, image, city, owner: userId })
    .then(() => {
      User.findByIdAndUpdate(userId, { role: 'business' }).then(() => res.redirect('/business/profile'));
    })
    .catch(err => next(err));
});

// RENDER BUSINESS HOME PAGE // option B per a que surti tot el tema business
router.get('/profile', (req, res, next) => {
  // he tret el middleware de business, si no no hi arriba a bus profile
  const owner = req.session.currentUser._id;
  User.findById(owner)
    .then(dbUser => {
      Business.findOne({ owner: dbUser.id }) // com passar l'id de business, que es  nomes un referencia de user ?¿?¿¿?
        .then(dbBusiness => {
          console.log(dbBusiness);
          res.render('business/mainPage', { dbUser, dbBusiness });
        });
    })
    .catch(err => next(err));
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
router.get('/product', (req, res) => res.render('business/add-product'));

router.post('/product', (req, res, next) => {
  const { price, description } = req.body;
  Business.findOne({ owner: req.session.currentUser._id })
    .then(dbBusiness => {
      Product.create({ businessName: dbBusiness.id, price, description }).then(dbProduct => {
        console.log(dbProduct);
        res.redirect('/business/profile');
      });
    })
    .catch(err => next(err));
});

module.exports = router;

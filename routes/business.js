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
    .then(()=> {
      User.findByIdAndUpdate(userId, { role: 'business' })
      .then(()=> res.redirect('/business/profile'))
    })   
    .catch((err)=> next(err));
});

// RENDER BUSINESS HOME PAGE //
// router.get('/profile', (req, res, next) => { // he tret el middleware de business, si no no hi arriba a bus profile
//  const owner = req.session.currentUser._id;
//  console.log(owner)
//   User.findById(owner)
//     .then(dbBusiness => res.render('business/mainPage', {dbBusiness}))   
//     .catch(err => next(err));
// });


// RENDER BUSINESS HOME PAGE // option B per a que surti tot el tema business
router.get('/profile', (req, res, next) => { // he tret el middleware de business, si no no hi arriba a bus profile
  const owner = req.session.currentUser._id; 
  User.findById(owner)
      .then(dbUser => {
        //const ownedBusiness = owner.ownedBusiness ?¿??¿¿? potser hem de ficar  una referencia las business  al  model  de  user ?¿?
        Business.find() // com passar l'id de business, que es  nomes un referencia de user ?¿?¿¿?        
        .then(dbBusiness => {
          console.log(dbBusiness)
          res.render('business/mainPage', {dbUser, dbBusiness}) 
        })
      })   
      .catch(err => next(err));
  });
  


// RENDER BUSINESS EDIT PAGE // 

router.get('/profile/edit', isBusiness, (req, res, next) => {
    Business.findById(id)
      .then(dbBusiness => res.render('business/edit-form', { dbBusiness }))
      .catch(error => next(error))
});
  
  // UPDATE DB BUSINESS DATA //

router.post('/profile/edit', isBusiness, (req, res, next) => {
  const { businessName, businessType, city, email, password  } = req.body;
  Business.findByIdAndUpdate(req.session.currentUser._id, { businessName, businessType, city, email, password  }, { new: true })
    .then(() => res.redirect('/business'))
    .catch(error => next(error));
});  

// // RENDER ADD PRODUCT FORM //
// router.get('/profile/product', isBusiness, (req, res) => {
//   res.render('business/add-product', {id});
// });

// router.post('/profile/product', isBusiness, (req, res, next) => {
//   const {price, description} = req.body;
//   Product.create({businessName: id, price, description})
//     .then(()=> res.redirect('/business'))
//     .catch(err => next(err));
// });

module.exports = router;

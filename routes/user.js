const express = require('express');

const router = express.Router();
const User = require('../models/User.model');
const Business = require('../models/Business.model');
const Product = require("../models/Product.model")
const isUserLoggedIn = require('../middleware/login');

router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  console.log("session", req.session.currentUser)
  User.findById({ _id: id })
  .then(userFromDB => {
    // en algun moment haurem de ficar un find  by alguna cosa, per city, o per tipus de menjar etc
    Business.find()
    .then(businessesFromDB => {
      Product.find()
      .then(productsFromDB  => {
        res.render('user/mainPage', { userFromDB, businessesFromDB, productsFromDB });
      })      
    })    
  
  });
  
});

// FIND CUSTOMER BY ID AND RENDER UPDATE FORM // NO FUNCIONA EL GET ¿?¿?¿?¿?¿?

router.get('/:id/edit', (req, res, next) => {
  const { id } = req.params;
  User.findById(id)
    .then(dbUser => {
      console.log(dbUser);
      res.render('user/edit-form', { dbUser });
    })
    .catch(error => next(error));
});

// UPDATE CUSTOMER DATA //

router.post('/:id/edit', (req, res, next) => {
  const { id } = req.params;
  const { firstName, lastName, email, password, city, age } = req.body;
  User.findByIdAndUpdate(id, { firstName, lastName, email, password, city, age }, { new: true })
    .then(dbUser => {
      res.redirect('/user');
      console.log('update', dbUser);
    })
    .catch(error => {
      next(error);
    });
});

// DELETE USER ///
// router.post('/:id', (req, res, next) => {
//     const { id } = req.params;
//     User.findByIdAndDelete(id)
//       .then(dbUser => {
//         console.log('delete', dbUser);
//         res.status(301);
//         res.redirect('/users');
//       })
//       .catch(error => {
//         next(error);
//       });
//   });

module.exports = router;

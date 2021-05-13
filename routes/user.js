const express = require('express');

const router = express.Router();
const User = require('../models/User.model');
const Business = require('../models/Business.model');
const Product = require('../models/Product.model');
const isUserLoggedIn = require('../middleware/login');

// todo no necesitas el id para mostrar el user lo sacas de la session
router.get('/:id', isUserLoggedIn, (req, res, next) => {
  const { id } = req.params;
  User.findById({ _id: id })
    .then(dbUser => {
      // en algun moment haurem de ficar un find  by alguna cosa, per city, o per tipus de menjar etc
      Business.find().then(dbBusiness => {
        Product.find().then(dbProducts => {
          res.render('user/mainPage', { dbUser, dbBusiness, dbProducts });
        });
      });
    })
    .catch(err => next(err));
});

// FIND CUSTOMER BY ID AND RENDER UPDATE FORM //
router.get('/:id/edit', isUserLoggedIn, (req, res, next) => {
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
  const { firstName, lastName, email, city, age } = req.body;
  User.findByIdAndUpdate(id, { firstName, lastName, email, city, age }, { new: true })
    .then(() => res.redirect(`/user/${id}`))
    .catch(error => {
      next(error);
    });
});

module.exports = router;

const express = require('express');

const router = express.Router();
const Customer = require('../models/Customer.model');
const Business = require('../models/Business.model');
const isUserLoggedIn = require('../middleware/login');

router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  Customer.findById({ _id: id })
  .then(customerFromDB => {
    console.log('BUSINESS FROM DB: ', customerFromDB);
    // en algun moment haurem de ficar un find  by alguna cosa, per city, o per tipus de menjar etc
    Business.find()
    .then(businessesFromDB => {
      res.render('customer/mainPage', { customerFromDB, businessesFromDB });
    })    
  
  });

  
});

// FIND CUSTOMER BY ID AND RENDER UPDATE FORM // NO FUNCIONA EL GET ¿?¿?¿?¿?¿?

router.get('/:id/edit', (req, res, next) => {
  const { id } = req.params;
  Customer.findById(id)
    .then(dbCustomer => {
      console.log(dbCustomer);
      res.render('customer/edit-form', { dbCustomer });
    })
    .catch(error => next(error));
});

// UPDATE CUSTOMER DATA //

router.post('/:id/edit', (req, res, next) => {
  const { id } = req.params;
  const { firstName, lastName, email, password, city, age } = req.body;
  Customer.findByIdAndUpdate(id, { firstName, lastName, email, password, city, age }, { new: true })
    .then(dbCustomer => {
      res.redirect('/customer');
      console.log('update', dbCustomer);
    })
    .catch(error => {
      next(error);
    });
});

// DELETE USER ///
// router.post('/:id', (req, res, next) => {
//     const { id } = req.params;
//     Customer.findByIdAndDelete(id)
//       .then(dbCustomer => {
//         console.log('delete', dbCustomer);
//         res.status(301);
//         res.redirect('/customers');
//       })
//       .catch(error => {
//         next(error);
//       });
//   });

module.exports = router;

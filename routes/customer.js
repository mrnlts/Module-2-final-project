const express = require('express');

const router = express.Router();
// const Customer = require('../models/Customer.model');

// router.get('/', (req, res, next) => {
//     res.render('customer/mainPage');
// })



// // FIND CUSTOMER BY ID AND RENDER UPDATE FORM //

// router.get('/:id/edit', (req, res, next) => {
//     const { id } = req.params;
//     Customer.findById(id)
//       .then(dbCustomer => {
//         res.render('customer/update-form', { dbCustomer });
//       })
//       .catch(error => next(error));
//   });
  
//   // UPDATE CUSTOMER DATA //

//   router.post('/:id/edit', (req, res, next) => {
//     const { id } = req.params;
//     const { firstName, lastName, email, password, city, age  } = req.body;
//     Customer.findByIdAndUpdate(id, { firstName, lastName, email, password, city, age  }, { new: true })
//       .then(dbCustomer => {     
//         res.redirect('/customers');
//         console.log('update', dbCustomer);
//       })
//       .catch(error => {
//         next(error);
//       });
//   });
  


// // DELETE USER ///
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

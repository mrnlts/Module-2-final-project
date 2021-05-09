const express = require('express');

const router = express.Router();
const bcryptjs = require('bcryptjs');
const Customer = require('../models/Customer.model');

// router.get('/login', (req, res, next) => {
//   res.render('auth/login');
// });

// router.post('/login', (req, res, next) => {
//   console.log('SESSION =====> ', req.session);
//   const { firstName, lastName, email, passwordHash, city, age  } = req.body;

//   if (email === '' || passwordHash === '') {
//     res.render('auth/login', {
//       errorMessage: 'Please enter both, email and password to login.',
//     });
//     return;
//   }

//   Customer.findOne({ email })
//     .then(dbCustomer => {
//       if (!dbCustomer) {
//         res.render('auth/login', { error: 'user not found' });
//       } else if (bcryptjs.compareSync(password, dbCustomer.passwordHash)) {
//         req.session.currentUser = dbCustomer;
//         res.redirect('/customer');
//       } else {
//         res.render('auth/login', { errorMessage: 'Incorrect password.' });
//       }
//     })      
//     .catch(error => {
//       next(error);
//     });
// });
module.exports = router;

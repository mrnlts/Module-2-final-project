const express = require('express');

const router = express.Router();
const bcryptjs = require('bcryptjs');
const Customer = require('../models/Customer.model');
const Business = require('../models/Business.model');


router.get('/login', (req, res) => res.render('auth/login'));

router.post('/logout', (req, res, next) => {
  // req.session.destroy(error => {
  //   if (error) {
  //     return next(error);
  //   }
  //   return res.render('index');
  // });
  req.session.destroy(() => {
    console.log('destroyed succesfully');
    return res.render('index');
    });
});

router.post('/login', (req, res, next) => {
  console.log('SESSION =====> ', req.session);
  const { email, password } = req.body;
  if (email === '' || password === '') {
    return res.render('auth/login', { errorMessage: 'Please enter both, email and password to login.' });
  }
  Customer.findOne({ email })
    .then(dbCustomer => {
      if (dbCustomer) {
        if (bcryptjs.compareSync(password, dbCustomer.passwordHash)) {
          // req.session.dbCustomer = dbCustomer;
          //console.log(req.session)
        // res.redirect('/customer/mainPage');
          const custInSession = req.session.dbCustomer;
          res.render('customer/mainPage', { dbCustomer, custInSession });
        } else {
          res.render('auth/login', { errorMessage: 'Incorrect password.' });
        }
      } else if (!dbCustomer) {
        Business.findOne({ email }).then(dbBusiness => {
          if (!dbBusiness) {
          res.render('auth/login', { error: 'Email is not registered. Try with other email.' });
          } else if (bcryptjs.compareSync(password, dbBusiness.passwordHash)) {
            // req.session.dbBusiness = dbBusiness;
            // res.redirect('/business/mainPage');
            const bussInSession = req.session.dbBusiness;
            res.render('business/mainPage', { dbBusiness, bussInSession });
          } else {
            res.render('auth/login', { errorMessage: 'Incorrect password.' });
          }
        });
      }
    })
    .catch(error => {
      next(error);
    });
});

module.exports = router;

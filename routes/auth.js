const express = require('express');

const router = express.Router();
const bcryptjs = require('bcryptjs');
const Customer = require('../models/Customer.model');
const Business = require('../models/Business.model');


router.get('/login', (req, res) => res.render('auth/login'));

router.post('/logout', (req, res, next) => {
  req.session.destroy(() => {
    console.log('destroyed succesfully');
    return res.render('index');
    });
});

router.post('/login', (req, res, next) => {
  console.log('SESSION =====> ', req.session);
  const {id} = req.params;
  const { email, password } = req.body;
  if (email === '' || password === '') {
    return res.render('auth/login', { errorMessage: 'Please enter both, email and password to login.' });
  }
  let {currentUser} = req.session;

  Customer.findOne({ email })
    .then(dbCustomer => {
      if (dbCustomer) {
        if (bcryptjs.compareSync(password, dbCustomer.passwordHash)) {
          currentUser = dbCustomer;
          const link = `/customer/${dbCustomer.id}`;
          res.redirect(link);
        } else {
          res.render('auth/login', { errorMessage: 'Incorrect password.' });
        }
      } else if (!dbCustomer) {
        Business.findOne({ email })
        .then(dbBusiness => {
          if (!dbBusiness) {
          res.render('auth/login', { error: 'Email is not registered. Try with other email.' });
          } else if (bcryptjs.compareSync(password, dbBusiness.passwordHash)) {
            currentUser = dbBusiness;
            const link = `/business/${dbBusiness.id}`;
            res.redirect(link);
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

const express = require('express');

const router = express.Router();
const bcryptjs = require('bcryptjs');
const Customer = require('../models/Customer.model');

router.get('/login', (req, res) => res.render('auth/login'));

router.post('/login', (req, res, next) => {
 console.log('SESSION =====> ', req.session);
  const { email, password } = req.body;

  if (email === '' || password === '') {
    return res.render('auth/login', { errorMessage: 'Please enter both, email and password to login.' });
  }
Customer.findOne({ email })
.then(dbCustomer => {
  if (!dbCustomer) {
    return res.render('auth/login', { error: 'Email is not registered. Try with other email.' });
  } else if (bcryptjs.compareSync(password, dbCustomer.passwordHash)) {
    res.render('customer/mainPage', { dbCustomer });
  } else {
    res.render('auth/login', { errorMessage: 'Incorrect password.' });
  }
})
.catch(error => {
  next(error);
});

});
module.exports = router;

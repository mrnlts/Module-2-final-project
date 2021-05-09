const express = require('express');

const router = express.Router();
const bcryptjs = require('bcryptjs');
const Customer = require('../models/Customer.model');

//const checkIfUserIsLoggedIn = require('../middleware/login'); MIDLEWARE A AFEGIR QUAN FEM RUTES PROTEGIDES

router.get('/login', (req, res) => res.render('auth/login'));

router.post('/login', (req, res, next) => {
  console.log('SESSION =====> ', req.session);
  const { email, passwordHash } = req.body;

  // if (email === '' || passwordHash === '') {
  //   res.render('auth/login', {
  //     errorMessage: 'Please enter both, email and password to login.',
  //   });
  //   return;
  // }

  Customer.findOne({ email })
    .then(dbCustomer => {
      if (!dbCustomer) {
       return res.render('auth/login', { error: 'user not found' });
      } 
      const { _id, email: eMail, hashedPassword } = dbCustomer;
      if (bcryptjs.compareSync(password, hashedPassword)) {
        req.session.currentUser = {
          _id,
          email: eMail,
        };
        return res.render('customer/mainPage');
      }
      return res.render('auth/login', { error: 'password incorrect' });
      })      
    .catch(error => {
      next(error);
    });
});
module.exports = router;


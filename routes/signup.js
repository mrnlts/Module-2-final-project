const { Router } = require('express');

const router = new Router();
const bcryptjs = require('bcryptjs');
const Customer = require('../models/Customer.model');

const saltRounds = 10;

//const checkIfUserIsLoggedIn = require('../middleware/login'); MIDLEWARE A AFEGIR QUAN FEM RUTES PROTEGIDES


router.get('/business', (req, res) => {
    res.render('signup/business');
});

router.get('/customer', (req, res) => {
    res.render('signup/customer');
});

router.post('/business', (req, res, next) => {
    // const {} = req.body;
        // .then(() => res.redirect('/business'))
        // .catch((err) => next(err));
    res.redirect('/business');
});


router.post('/customer', (req, res, next) => {
    const { firstName, lastName, email, password, city, age  } = req.body;
   // console.log(req.body)

  //   Customer.create({ firstName,  lastName,   email,  password,   city,  age  })
  //   .then(dbCustomer => {
  //     console.log('Newly created customer is: ', dbCustomer);
  //     res.render('customer/mainPage');
  //   })
  // })

    bcryptjs
      .genSalt(saltRounds)
      .then(salt => {
        console.log('salt', salt);
        return bcryptjs.hash(password, salt);
      })
      .then(hashedPassword => Customer.create({ firstName, lastName, email, hashedPassword, city, age }))
      .then(dbCustomer => {       
        console.log('Newly created customer is: ', dbCustomer); 
        res.render('customer/mainPage');       
      })
      .catch(error => next(error));
  });

module.exports = router;



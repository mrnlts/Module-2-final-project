const { Router } = require('express');

const router = new Router();

const bcryptjs = require('bcryptjs');

const saltRounds = 10;

//const checkIfUserIsLoggedIn = require('../middleware/login'); MIDLEWARE A AFEGIR QUAN FEM RUTES PROTEGIDES

const Customer = require('../models/Customer.model');

router.get('/business', (req, res, next) => {
    res.render('signup/business');
});

router.get('/customer', (req, res, next) => {
    res.render('signup/customer');
});


router.post('/business', (req, res, next) => {
    // const {} = req.body;
        // .then(() => res.redirect('/business'))
        // .catch((err) => next(err));
    res.redirect('/business');
});


router.post('/customer', (req, res, next) => {
    const { firstName, lastName, email, passwordHash, city, age  } = req.body;

    const hashedPassword = bcryptjs.hashSync(passwordHash);
    console.log(`Password hash: ${hashedPassword}`);
  
    bcryptjs
      .genSalt(saltRounds)
      .then(salt => bcryptjs.hash(passwordHash, salt))
      .then(hashedPassword => {
        return Customer.create({
          firstName,
          lastName,
          email,
          passwordHash: hashedPassword,
          city,
          age,
        });
      })
      .then(dbCustomer => {
        console.log('Newly created customer is: ', dbCustomer);
        res.redirect('customer/mainpage');
      })
      .catch(error => next(error));
  });

module.exports = router;

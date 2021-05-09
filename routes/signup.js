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

    const hashedPassword = bcryptjs.hashSync(password);
    console.log(`Password hash: ${hashedPassword}`);
    console.log(req.body)
  
   
    Customer.create({ firstName,  lastName,   email,  password,   city,  age,  })
    .then(dbCustomer => {
      console.log('Newly created customer is: ', dbCustomer);
      res.redirect('/customer');
    })
  })
  

    
  //   bcryptjs
  //     .genSalt(saltRounds)
  //     .then(salt => bcryptjs.hash(password, salt))
  //     .then(hashedPassword => {
  //       return Customer.create({
  //         firstName,
  //         lastName,
  //         email,
  //         passwordHash: hashedPassword,
  //         city,
  //         age,
  //       });
  //     })
  //     .then(dbCustomer => {
  //       console.log('Newly created customer is: ', dbCustomer);
  //       res.redirect('/customer');
  //     })
  //     .catch(error => next(error));
  // });

module.exports = router;

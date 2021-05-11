const { Router } = require('express');

const router = new Router();
const bcryptjs = require('bcryptjs');
const User = require('../models/User.model');
const Business = require('../models/Business.model');
const saltRounds = 10;


// router.get('/user', (req, res) => {
//     res.render('signup/user');
// });

router.post('/business', (req, res, next) => {
    const { businessName, businessType, city, email, password  } = req.body;
    bcryptjs
        .genSalt(saltRounds)
        .then(salt => bcryptjs.hash(password, salt))
        .then(hashedPassword => Business.create({ businessName, businessType, city, email, passwordHash: hashedPassword  }))
        .then((dbBusiness) => {
          console.log(dbBusiness);
          res.render('business/mainPage', {dbBusiness})
        })
        .catch(err => next(err))
});


router.post('/user', (req, res, next) => {
    const { firstName, lastName, email, password, city, age  } = req.body;
    bcryptjs
      .genSalt(saltRounds)
      .then(salt => bcryptjs.hash(password, salt))
      .then(hashedPassword => User.create({ firstName, lastName, email, passwordHash: hashedPassword, city, age  }))
      .then(dbUser => {       
        console.log('Newly created user is: ', dbUser); 
        res.render('user/mainPage');       
      })
      .catch(error => next(error));
  });

module.exports = router;



const express = require('express');

const router = express.Router();
const User = require('../models/User.model');
const Business = require('../models/Business.model');
const isUserLoggedIn = require('../middleware/login');

router.get('/profile', isUserLoggedIn, (req, res, next) => {
  //const { id } = req.session.currentUser.id;
  console.log("CURRENT SESSION: ", req.session)
  User.findById( req.session.currentUser._id )
    .then(dbUser => {
      Business.find()
       .then(dbBusiness => {
        // console.log(dbBusiness)
        res.render("user/mainPage", {dbUser, dbBusiness})
      })
    })
    .catch(err => next(err));
});

// FIND CUSTOMER BY ID AND RENDER UPDATE FORM //
router.get('/profile/edit', isUserLoggedIn, (req, res, next) => {
  User.findById( req.session.currentUser._id )
    .then(dbUser => {
      res.render('user/edit-form', { dbUser })
    })
    .catch(error => next(error));
});

// UPDATE CUSTOMER DATA //
router.post('/profile/edit', (req, res, next) => {
  const { firstName, lastName, email, city, age } = req.body;
  User.findByIdAndUpdate(req.session.currentUser._id, { firstName, lastName, email, city, age }, { new: true })
    .then(() => res.redirect('/user/profile'))
    .catch(error => next(error));
});

module.exports = router;





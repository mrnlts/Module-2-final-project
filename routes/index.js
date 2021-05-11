const express = require('express');

const Business = require('../models/Business.model');


const router = express.Router();


/* GET home page. */
router.get('/', (req, res) => {
  res.render('index');
});

/* GET signup  */
router.get('/signup', (req, res) => {
  res.render('signup/user');
});

router.post("/signup", (req, res) => {
  res.redirect("/index")
})

/* GET login. */
router.get('/login', (req, res) => {
  res.render('auth/login');
});

/* GET business-list */
router.get('/list', (req, res, next) => { // cambiar nombre list por business.
  Business.find()
    .then((businessesFromDB) =>  res.render('business/list', {businessesFromDB})) // cambiar por dbBusiness
    .catch(err => next(err));
});

module.exports = router;

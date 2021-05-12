const express = require('express');

const router = express.Router();
const Business = require('../models/Business.model');

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index');
});

/* GET login. */
router.get('/login', (req, res) => {
  res.render('auth/login');
});

/* GET business-list */
router.get('/list', (req, res, next) => { // cambiar nombre list por business.
  Business.find()
    .then((dbBusiness) =>  res.render('business/list', {dbBusiness})) // cambiar por dbBusiness
    .catch(err => next(err));
});

module.exports = router;

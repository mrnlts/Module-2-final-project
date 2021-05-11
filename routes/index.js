const express = require('express');
const router = express.Router();
const Business = require('../models/Business.model');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index');
  console.log("tituli2", req.params)
});

/* GET signup crossroad. */
router.get('/signup', (req, res, next) => {
  res.render('auth/crossroad');
});

/* GET login. */
router.get('/login', (req, res, next) => {
  res.render('auth/login');
});

/* GET business-list */
router.get('/list', (req, res, next) => {
  Business.find()
    .then((businessesFromDB) =>  res.render('business/list', {businessesFromDB}))
    .catch(err => next(err));
});

module.exports = router;

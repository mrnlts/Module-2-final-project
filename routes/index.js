const express = require('express');

const router = express.Router();
const Business = require('../models/Business.model');

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index');
});

/* GET business-list */
router.get('/business', (req, res, next) => {
  Business.find()
    .then(dbBusiness => res.render('business/list', { dbBusiness, auth:true }))
    .catch(err => next(err));
});

module.exports = router;

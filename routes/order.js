const express = require('express');

const isUserLoggedIn = require('../middleware/login');
const Order = require('../models/Order.model');

const router = express.Router();

router.post('/', isUserLoggedIn, (req, res, next) => {
  const urlArr = req.headers.referer.split('/');
  const userID = urlArr[urlArr.length - 1];
  Order.create({ product: req.body.order, user: userID })
    .then(() => res.redirect(`/user/${userID}`)) // Make flash alert to alert from order confirmed
    .catch(err => next(err));
});

module.exports = router;

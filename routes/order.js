const express = require('express');

const router = express.Router();
const User = require('../models/User.model');
const Business = require('../models/Business.model');
const Product = require("../models/Product.model");
const isUserLoggedIn = require('../middleware/login');
const Order = require("../models/Order.model");

router.post('/',  (req,res, next) => {
    const urlArr = req.headers.referer.split('/');
    const userID = urlArr[urlArr.length-1];
    Order.create({ product: req.body.order, user: userID })
        .then((orderFromDB) => {
            console.log(orderFromDB);
            alert("Your order has been processed! user ID:", userID, "Product ID:",  req.body.order);
            res.redirect(`/user/${userID}`);
        })
        .catch(err => next(err));
});

module.exports = router;
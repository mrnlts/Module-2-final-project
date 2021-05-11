const express = require('express');

const router = express.Router();
const Customer = require('../models/Customer.model');
const Business = require('../models/Business.model');
const Product = require("../models/Product.model");
const isUserLoggedIn = require('../middleware/login');
const Order = require("../models/Order.model");

router.post('/',  (req,res, next) => {
    const urlArr = req.headers.referer.split('/');
    const customerID = urlArr[urlArr.length-1];
    Order.create({ product: req.body.order, customer: customerID })
        .then((orderFromDB) => {
            console.log(orderFromDB);
            alert("Your order has been processed! Customer ID:", customerID, "Product ID:",  req.body.order);
            res.redirect(`/customer/${customerID}`);
        })
        .catch(err => next(err));
});

module.exports = router;
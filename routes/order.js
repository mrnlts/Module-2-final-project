const express = require('express');

const router = express.Router();
const Customer = require('../models/Customer.model');
const Business = require('../models/Business.model');
const Product = require("../models/Product.model")
const isUserLoggedIn = require('../middleware/login');
const Order = require("../models/Order.model")



router.post("/",  (req,res, next) => {
Order.create({ product: req.body.order, customer: req.params })
console.log("order?", req.body.order, "titulin", req.query)

})


module.exports = router;
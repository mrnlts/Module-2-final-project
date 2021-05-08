const express = require('express');
const router = express.Router();

router.get('/business', (req, res, next) => {
    res.render('signup/business');
});

router.get('/customer', (req, res, next) => {
    res.render('signup/customer');
});


module.exports = router;
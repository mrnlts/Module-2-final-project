const express = require('express');
const router = express.Router();

router.get('/business', (req, res, next) => {
    res.render('signup/business');
});

router.get('/customer', (req, res, next) => {
    res.render('signup/customer');
});

router.post('/business', (req, res, next) => {
    // const {} = req.body;
        // .then(() => res.redirect('/business'))
        // .catch((err) => next(err));
    res.redirect('/business');
});

router.post('/customer', (req, res, next) => {
    // const {} = req.body;
        // .then(() => res.redirect('/customer'))
        // .catch((err) => next(err));
    res.redirect('/customer');
});


module.exports = router;
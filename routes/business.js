const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.render('business/mainPage');
})

module.exports = router;

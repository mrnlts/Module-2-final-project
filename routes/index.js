const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index');
});

/* GET signup crossroad. */
router.get('/signup', (req, res, next) => {
  res.render('auth/crossroad');
});

/* GET login. */
router.get('/login', (req, res, next) => {
  res.render('auth/login');
});


module.exports = router;

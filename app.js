require('dotenv').config();

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const flash = require('connect-flash');
const hbs = require('hbs');
const appSession = require('./configs/session');



const app = express();

// Routes Setup //
const indexRouter = require('./routes/index');
const user = require('./routes/user');
const businessRouter = require('./routes/business');
const authRouter = require('./routes/auth');
const orderRouter = require('./routes/order');

// require database configuration
require('./configs/db.config');

// Middleware setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session(appSession));
app.use(flash());
// app.use((req, res, next) => {
//     res.locals.sessionFlash = req.session.sessionFlash;
//     next();
//   });
app.use(express.static(path.join(__dirname, 'public')));

// Express view engine setup
app.set('views', path.join(__dirname, 'views'));
// hbs.registerPartials(__dirname, '/views/partials');
app.set('view engine', 'hbs');


// Register helper
hbs.registerHelper('orderDisplay', (status) => {
  const div = '<div class="business_orders_page_item">  <h4 class="content_card_title">New order!</h4>   <p class="content_card_id">Order ID: {{this._id}}</p>   <p class="content_card_user">User: {{this.user.firstName}}</p>   <p class="content_card_product">Product: {{this.product.description}}</p>   <p class="content_card_product">Status: {{this.status}}</p>   <form action="/orders/{{this._id}}/delivered" method="POST">       <input type="submit" value="Mark as delivered">   </form> </div>';
  if (status === 'pending') {
    return div;
  }
});


app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/user', user);
app.use('/business', businessRouter);
app.use('/orders', orderRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});




// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  if (err.status === 404) {
    res.status(404);
    res.render('error404');
  } else if (err.status === 500) {
    res.status(500);
    res.render('error500');
  }
});

module.exports = app;

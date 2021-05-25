require('dotenv').config();

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const flash = require('connect-flash');
const hbs = require('hbs');
const passport = require('passport');
const appSession = require('./configs/session');


const app = express();

// Routes Setup //
const indexRouter = require('./routes/index');
const user = require('./routes/user');
const businessRouter = require('./routes/business');
const authRouter = require('./routes/auth');
const orderRouter = require('./routes/order');

// Middleware setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session(appSession));
app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));


// require database configuration
require('./configs/db.config');
require('./configs/passport.config.js')(passport)


// Express view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Register helper
hbs.registerPartials(path.join(__dirname, '/views/partials'));

// Register routes
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
    
    
  } else if (err.status === 500) {
    res.status(500);
    res.render('error500');
  }
});

module.exports = app;

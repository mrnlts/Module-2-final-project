require('dotenv').config();

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');

const router = express.Router();

const hbs = require('hbs');

const app = express();


// const app_name = require('./package.json').name;
// const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);



// Routes Setup //
const indexRouter = require('./routes/index');
const customerRouter = require('./routes/customer');
const businessRouter = require('./routes/business');
const authRouter = require('./routes/auth'); 
const signupRouter = require('./routes/signup'); 

// require database configuration
require('./configs/db.config');


// Middleware setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


// Express view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

const appSession = require('./configs/session');

app.use(session(appSession));

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/signup', signupRouter);
app.use('/customer', customerRouter);
app.use('/business', businessRouter);


// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
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

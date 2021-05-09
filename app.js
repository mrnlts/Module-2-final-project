require('dotenv').config();

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const router = express.Router();
const hbs = require('hbs');
const mongoose = require('mongoose');

mongoose
  .connect(`mongodb://localhost/${process.env.DB_NAME}`, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to DB 🚀', process.env.DB_NAME);
    console.log('Listening on port 3000');
  })
  .catch(error => {
    console.log('error ', error);
  });

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);
const session = require('express-session');
const MongoStore = require('connect-mongo');
const app = express();

// Routes Setup //
const indexRouter = require('./routes/index');
const customerRouter = require('./routes/customer');
const businessRouter = require('./routes/business');
const authRouter = require('./routes/auth'); 
const signupRouter = require('./routes/signup'); 

// Middleware setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


// Express view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
  app.use(
    session({
      store: MongoStore.create({
        mongoUrl: `mongodb://localhost/${process.env.DB_NAME}`, 
        ttl: 24 * 60 * 60,
      }),
      secret: process.env.SESS_SECRET,
      resave: true,
      saveUninitialized: false,
      cookie: {
        sameSite: 'none',
        httpOnly: true,
        maxAge: 60000,
      },
    }),
  );



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

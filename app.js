require('dotenv').config();

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');

const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const flash = require("connect-flash")
const appSession = require('./configs/session');

const User = require('./models/User.model');

const app = express();

// Routes Setup //
const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
const businessRouter = require('./routes/business');
const authRouter = require('./routes/auth');
const orderRouter = require('./routes/order');

// require database configuration
require('./configs/db.config');

// require('./configs/passport.config');


// passport config
passport.serializeUser((user, done) => {
  console.log('OK')
  done(null, user);
});


passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => done(null, user))
    .catch(err => done(err));
});
 

passport.use
(new LocalStrategy(
  { passReqToCallback: true },
  {
    usernameField: 'email',
    passwordField: 'password',
  },

  (  email, password, done) => {
    User.findOne({  email })
      .then(user => {
        if (!user) {
         return done (null, false);
        } 
        if (!bcrypt.compareSync(password, user.passwordHash)) {
          return done (null, false )
        } 
 
        return done(null, user)
        
      })
      .catch(err => done(err));
  },
),
);

// Middleware setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session(appSession));
app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());
app.use(passport.session());

// Express view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/business', businessRouter);
app.use('/orders', orderRouter);

// catch 404 and forward to error handler
app.use((req, res, done) => {
  done(createError(404));
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

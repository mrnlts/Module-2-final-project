const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');

module.exports = app => {
  app.use(
    session({
      store: MongoStore.create({
        mongoUrl: "localhost:27017/Zero-food-waste-app", // aixo crec que s'ha de passar al ENV
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
};

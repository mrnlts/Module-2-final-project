// const session = require('express-session');
// const MongoStore = require('connect-mongo')(session);

// const mongoose = require('mongoose');

// module.exports = app => {
//   app.use(
//     session({
//       store: MongoStore.create({
//         mongoUrl: `mongodb://localhost/${process.env.DB_NAME}`, // aixo crec que s'ha de passar al ENV
//         //mongoUrl: "mongodb://localhost:27017/Zero-food-waste-app",
//         ttl: 24 * 60 * 60,
//       }),
//       secret: process.env.SESS_SECRET,
//       resave: true,
//       saveUninitialized: false,
//       cookie: {
//         sameSite: 'none',
//         httpOnly: true,
//         maxAge: 60000,
//       },
//     }),
//   );
// };

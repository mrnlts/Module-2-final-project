const mongoose = require('mongoose');
require('dotenv').config();

const mongoDbUrl = `${process.env.MONGODB_URI}${process.env.DB_NAME}`;

const connection = mongoose
  .connect( mongoDbUrl, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Connected to DB 🚀', process.env.DB_NAME);
    console.log('Listening on port 3000');
  })
  .catch(err => console.error('Error connecting to mongo', err));
 
  module.exports = connection;
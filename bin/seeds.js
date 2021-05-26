const mongoose = require('mongoose');
const Business = require('../models/Business.model');
const User = require('../models/User.model');

const firstUsers = [
  { firstName: 'Speedy', lastName: "Gonzalez",  email: 'speedy@testing.com', password: " ", city: 'Barcelona', age: 22 },
  { firstName: 'Andreu', lastName: "Buenafuente",  email: 'buenafuente@testing.com', password: " ", city: 'Barcelona', age: 62 },
  { firstName: 'Danny', lastName: "DeVito",  email: 'devitto@testing.com', password: " ", city: 'Barcelona', age: 46 },
];

mongoose.connect(`mongodb://localhost/${process.env.DB_NAME}`, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


User.create(firstUsers)
  .then(dbUsers => {
    console.log(`Created ${dbUsers.length} Users`);    
  })
  .then(() => {
    mongoose.connection.close();
  })
  .catch(err => console.log(`An error occurred while creating User on the DB: ${err}`));





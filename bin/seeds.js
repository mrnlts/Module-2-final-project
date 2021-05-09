const mongoose = require('mongoose');
const Business = require('../models/Business.model');
const Customer = require('../models/Customer.model');

mongoose.connect(`mongodb://localhost:27017/Zero-food-waste-app`, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const firstCustomers = [
  { firstName: 'Speedy', lastName: "Gonzalez",  email: 'speedy@test.com', passwordHash: " ", city: 'Barcelona', age: 22 },
  { firstName: 'Andreu', lastName: "Buenafuente",  email: 'buenafuente@test.com', passwordHash: " ", city: 'Barcelona', age: 62 },
  { firstName: 'Danny', lastName: "DeVito",  email: 'devitto@test.com', passwordHash: " ", city: 'Barcelona', age: 46 },
];

Customer.create(firstCustomers)
  .then(dbCustomers => {
    console.log(`Created ${dbCustomers.length} customers`);    
  })
  .then(() => {
    mongoose.connection.close();
  })
  .catch(err => console.log(`An error occurred while creating customer on the DB: ${err}`));





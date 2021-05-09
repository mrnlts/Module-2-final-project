const mongoose = require('mongoose');
const Business = require('../models/Business.model');
const Customer = require('../models/Customer.model');

const firstCustomers = [
  { firstName: 'Speedy', lastName: "Gonzalez",  email: 'speedy@testing.com', passwordHash: " ", city: 'Barcelona', age: 22 },
  { firstName: 'Andreu', lastName: "Buenafuente",  email: 'buenafuente@testing.com', passwordHash: " ", city: 'Barcelona', age: 62 },
  { firstName: 'Danny', lastName: "DeVito",  email: 'devitto@testing.com', passwordHash: " ", city: 'Barcelona', age: 46 },
];

mongoose.connect(`mongodb://localhost/${process.env.DB_NAME}`, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


Customer.create(firstCustomers)
  .then(dbCustomers => {
    console.log(`Created ${dbCustomers.length} customers`);    
  })
  .then(() => {
    mongoose.connection.close();
  })
  .catch(err => console.log(`An error occurred while creating customer on the DB: ${err}`));





const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const customerSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    hashedPassword: String,
    city: String,
    age: Number
},
{
    timestamps: true
});

const Customer = model('Customer', customerSchema);

module.exports = Customer;
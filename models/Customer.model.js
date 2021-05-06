const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const customerSchema = new Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        required: [true, 'Email is required.'],
        unique: true,
        lowercase: true,
        trim: true
      },
      passwordHash: {
        type: String,
        required: [true, 'Password is required.']
    },
    city: String,
    age: Number
},
{
    timestamps: true
});

const Customer = model('Customer', customerSchema);

module.exports = Customer;
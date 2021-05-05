const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const businessSchema = new Schema({
    businessName: String,
    businessType: String,
    image: String,
    email: String,
    hashedPassword: String,
    location: Array
},
{
    timestamps: true
});

const Business = model('Business', businessSchema);

module.exports = Business;
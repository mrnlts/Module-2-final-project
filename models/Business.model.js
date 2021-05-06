const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const businessSchema = new Schema({
    businessName: String,
    businessType: String,
    image: String,
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
    location: Array
},
{
    timestamps: true
});

const Business = model('Business', businessSchema);

module.exports = Business;
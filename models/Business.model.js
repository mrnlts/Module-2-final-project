const mongoose = require('mongoose');

const {Schema, model} = mongoose;

const businessSchema = new Schema({
    businessName: String,
    businessType: String,
    image: String,
    city: String,
    owner: {type: Schema.Types.ObjectId, ref: 'User'}
},
{
    timestamps: true
});

const Business = model('Business', businessSchema);

module.exports = Business;
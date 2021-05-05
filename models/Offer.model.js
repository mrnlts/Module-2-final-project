const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const offerSchema = new Schema({
    businessName: {
        type: Schema.Types.ObjectId, ref: 'Business'
    },
    image: String,
    price: Number,
    description: String
});

const Offer = model('Offer', offerSchema);

module.exports = Offer;
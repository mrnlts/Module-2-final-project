const mongoose = require('mongoose');

const {Schema, model} = mongoose;

const productSchema = new Schema({
    businessName: {
        type: Schema.Types.ObjectId, ref: 'Business'
    },
    imageUrlProduct: String,
    price: Number,
    description: String
});

const Product = model('Product', productSchema);

module.exports = Product;
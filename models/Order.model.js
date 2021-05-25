const mongoose = require('mongoose');

const {Schema, model} = mongoose;

const orderSchema = new Schema({
    business: {
        type: Schema.Types.ObjectId, ref: 'Business'
    },
    product: {
        type: Schema.Types.ObjectId, ref: 'Product'
    },
    user: {
        type: Schema.Types.ObjectId, ref: 'User'
    },
    status: {
        type: String,
        enum: ['pending', 'delivered']
    }
},
{
    timestamps: true
});

const Order = model('Order', orderSchema);

module.exports = Order;

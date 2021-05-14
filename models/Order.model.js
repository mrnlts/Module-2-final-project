const mongoose = require('mongoose');

const {Schema, model} = mongoose;

const orderSchema = new Schema({
    product: {
        type: Schema.Types.ObjectId, ref: 'Product'
    },
    user: {
        type: Schema.Types.ObjectId, ref: 'User'
    }
},
{
    timestamps: true
});

const Order = model('Order', orderSchema);

module.exports = Order;

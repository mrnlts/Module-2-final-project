const mongoose = require('mongoose');

const {Schema, model} = mongoose;

const orderSchema = new Schema({
    business: {
        type: Schema.Types.ObjectId, ref: 'Business'
    },
    products: 
        [{
            product: {
                type: Schema.Types.ObjectId, ref: 'Product',
            },
            amount: {
                type: Number,
                default: 1,
            },
        }],
    user: {
        type: Schema.Types.ObjectId, ref: 'User'
    },
    status: {
        type: String,
        enum: ['open', 'confirmed', 'delivered'],
        default: 'open'
    }
},
{
    timestamps: true
});

const Order = model('Order', orderSchema);

module.exports = Order;

const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const orderSchema = new Schema({
    offer: {
        type: Schema.Types.ObjectId, ref: 'Offer'
    },
    customer: {
        type: Schema.Types.ObjectId, ref: 'Customer'
    }
},
{
    timestamps: true
});

const Order = model('Order', orderSchema);

module.exports = Order;
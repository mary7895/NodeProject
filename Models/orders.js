const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    products: [{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }]
});

const Order = mongoose.model('Order', orderSchema); 
module.exports = Order; 

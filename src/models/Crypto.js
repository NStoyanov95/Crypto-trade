const mongoose = require('mongoose');


const cryptoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter name'],
        minLength: [2, 'Name should be at least 2 characters long']
    },
    image: {
        type: String,
        required: [true, 'Please enter image'],
        match: [/^https?:\/\//, 'Image URL should start with http:// or https://']
    },
    price: {
        type: Number,
        required: [true, 'Please enter price'],
        min: [0, 'Price should be positive number']
    },
    cryptoDescription: {
        type: String,
        required: [true, 'Please enter description'],
        minLength: [10, 'Description should be at least 10 characters long']
    },
    paymentMethod: {
        type: String,
        required: [true, 'Please enter payment method'],
        enum: {
            values: ['crypto-wallet', 'credit-card', 'debit-card', 'paypal'],
            message: 'Payment method should be one of the following: crypto-wallet, credit-card, debit-card, paypal'
        }
    },
    buyACrypto: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
});

const Crypto = mongoose.model('Crypto', cryptoSchema);

module.exports = Crypto;
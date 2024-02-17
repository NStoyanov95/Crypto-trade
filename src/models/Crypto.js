const mongoose = require('mongoose');


const cryptoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    cryptoDescription: {
        type: String,
        required: true
    },
    paymentMethod: {
        type: String,
        required: true,
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
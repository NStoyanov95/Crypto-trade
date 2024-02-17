const Crypto = require('../models/Crypto');


exports.create = (cryptoData) => Crypto.create(cryptoData);

exports.getAll = () => Crypto.find();

exports.getOne = (cryptoId) => Crypto.findById(cryptoId);

exports.buy = (cryptoId, userId) => Crypto.findByIdAndUpdate(cryptoId, { $push: { buyACrypto: userId } });

exports.delete = (cryptoId) => Crypto.findByIdAndDelete(cryptoId);

exports.edit = (cryptoId, cryptoData) => Crypto.findByIdAndUpdate(cryptoId, cryptoData, { runValidators: true });
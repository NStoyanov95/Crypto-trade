const mongoose = require('mongoose');


//CHANGE DB NAME
const dbConfigurator = async () =>{
    await mongoose.connect('mongodb://127.0.0.1:27017/crypto-trade');
};

module.exports = dbConfigurator;


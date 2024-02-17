const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please enter username.'],
        minLength: [5, 'Username should be at least 5 characters long']
    },
    email: {
        type: String,
        required: [true, 'Please enter email.'],
        unique: true,
        minLength: [10, 'Email should be at least 10 characters long']
    },
    password: {
        type: String,
        required: [true, 'Please enter password.'],
        minLength: [4, 'Password should be at least 4 characters long']
    }
})

userSchema.pre('save', async function() {
    this.password = await bcrypt.hash(this.password, 12);    
});

userSchema.virtual('rePassword')
    .set(function(value) {
        if (this.password !== value) {
            throw new Error('Password missmatch!');
        }
    });

const User = mongoose.model('User', userSchema);

module.exports = User;
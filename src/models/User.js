const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please enter username.']
    },
    email: {
        type: String,
        required: [true, 'Please enter email.'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please enter password.'],
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
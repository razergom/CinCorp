const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    permission: {
        type: String,
        required: true
    }
});

let User = mongoose.model('User', userSchema, 'users');
module.exports = User;
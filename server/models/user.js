const mongoose = require('mongoose');

var User = mongoose.model('User', {
    username: {
        type: String,
        required: true,
        minLength: 3,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
});

module.exports = {User}
const mongoose = require('mongoose');
const validator = require('validator');

// {
//     email: 'tina@enclave.vn'
//     password: 'tina123456'
//     tokens: [{
//         access: 'auth',
//         token: ''
//     }]
// }

var User = mongoose.model('User', {
    email: {
        type: String,
        required: true,
        minLength: 3,
        trim: true,
        unique: [
            true,
            "Email must be a unique"
        ], 
        validata: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email'
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    tokens: [
        {
            acces: {
                type: String,
                required: true
            },
            token: {
                type: String,
                required: true
            }
        }
    ]
});

module.exports = {User}
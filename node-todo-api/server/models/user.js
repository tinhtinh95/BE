const _ = require('lodash');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const validator = require('validator');
const brcypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
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
            access: {
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

UserSchema.methods.toJSON = function() {
    const user = this;
    const userObject = user.toObject();

    return _.pick(userObject, ['_id', 'email']);
};

UserSchema.methods.generateAuthToken = function(){
    const user = this;
    const access = 'auth';
    const token = jwt.sign({_id: user._id.toHexString(), access}, 'avc').toString();

    user.tokens = user.tokens.concat([{access, token}]);

    return user.save().then(()=>{
        return token;
    })
};

UserSchema.statics.findByToken = function(token){
    const user = this;
    var decoded;

    try{
        decoded = jwt.verify(token, 'avc');
    }catch(e){
        return Promise.reject('Your request is rejected');
    }

    return user.findOne({
        _id: decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    })
};

UserSchema.pre('save', function(next){
    var user = this;

    if(user.isModified('password')){
        brcypt.genSalt(10, (err, salt) => {
            brcypt.hash(user.password, salt, (err, hash) => {
                user.password = hash;
                next();
            })
        })
    }else{
        next(); // finish middleware
    }
})

var User = mongoose.model('User', UserSchema);

module.exports = {User}
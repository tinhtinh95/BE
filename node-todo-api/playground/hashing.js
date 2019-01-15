const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// var message = "I am user number 3";
// var hash = SHA256(message).toString();

// console.log(`Message: ${message}`);
// console.log(`Hash: `, hash);

const data = {
    id: 10
}

const token = jwt.sign(data, 'avc');
console.log(token);

console.log(jwt.verify(token, 'avc'));

const pwd = "tina123";

bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(pwd, salt, (err, hash) => {
        console.log(hash);
    })
});
var hashedPwd = "$2a$10$ziZUJOIJhns29cSgbby6eenkngkdU9iMqBpvL5onooD25tGxg3jB6";

bcrypt.compare('pwd', hashedPwd, (err, result) => {
    console.log(result);
});
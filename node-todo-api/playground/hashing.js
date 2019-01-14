const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

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
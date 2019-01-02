const db = require('./db.js');

module.exports.handleSignUp = (email, password) => {
    // Check if email already exists
    // Save the user to the database
    db.saveUser({email, password});
    // Send the welcome email

}
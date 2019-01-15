const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');

const {Todo} = require('./../../models/todo');
const {User} = require('./../../models/user');

const userID1 = new ObjectID();
const userID2 = new ObjectID();

const users = [
    {
        _id: userID1,
        email: 'tina@123.com',
        password: 'password1',
        tokens: [{
            access: 'auth',
            token: jwt.sign({_id: userID1, access: 'auth'}, 'abc123').toString()
        }]
    },
    {
        _id: userID2,
        email: 'tina123@tina.com',
        password: 'password2',
        tokens: [{
            access: 'auth',
            token: jwt.sign({_id: userID2, access: 'auth'}, 'abc123').toString()
        }]
    }
]
const todos = [
    {
        _id: new ObjectID(),
        text: 'First test todo',
    },
    {
        _id: new ObjectID(),
        text: 'Second test todo',
        completed: true,
        completedAt: 333
    }
];
const populateTodos = done => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => done());
}

const populateUsers = done => {
    User.remove({}).then(() => {
        const userOne = new User(users[0]).save();
        const userTwo = new User(users[1]).save();

        return Promise.all([userOne, userTwo]);
        // return User.insertMany(users);
    }).then(() => done());
}

module.exports = {
    todos, 
    populateTodos,
    users,
    populateUsers
}

// khi goi class user => cac method cua no duoc goi automatically
// neu dung insertMany => k hash pass va generate token duoc
// => dung save tung cai user
// user.insertMany tra ve Promise => return Promise
// remove({}) remove everything single record

// using save to be running the middleware and using Promise all to waiting all of actions save() succeed
// Promise all return array promise
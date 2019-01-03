const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

var Todo = mongoose.model('Todo', {
    text: {
        type: String,
        required: true,
        minLength: 1,
        trim: true 
    },
    completed: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Number,
        default: null
    }
});

var newTodo = new Todo({
    // text: 'A new todo',
    // completed: true,
    // completedAt: 111
});

// newTodo.save().then((doc) => {
//     console.log('Saved todo,', JSON.stringify(doc, undefined, 2));
// }, (e) => {
//     console.log('Unable to save todo', e)
// });

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

var newUser = new User({
    username: 'Tina   ',
    password: '126456'
}).save().then((doc) => {
    console.log('Saved user success: ', JSON.stringify(doc, undefined, 2))
}, (err) => {
    console.log('Unable to save user: ', err)
})
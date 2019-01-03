const express = require('express');
const bodyParser = require('body-parser');

const {mongoose} =require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');

var app = express();

// app.get('/', (req, res) => {
//     res.send({});
// })

app.use(bodyParser.json())

app.post('/todos', (req, res)=> {
    console.log(req.body);
    var newTodo = new Todo({
        text: req.body.text,
    });
    newTodo.save().then((doc) => {
        console.log('Saved todo,', JSON.stringify(doc, undefined, 2));
        res.send(doc); // neu k co thi post man cu chay mai
    }, (e) => {
        res.status(400).send(e);
        console.log('Unable to save todo', e)
    })
})

app.listen(3000, () => {
    console.log('Started on port 3000');
})


// var newUser = new User({
//     username: 'Tina   ',
//     password: '126456'
// }).save().then((doc) => {
//     console.log('Saved user success: ', JSON.stringify(doc, undefined, 2))
// }, (err) => {
//     console.log('Unable to save user: ', err)
// })
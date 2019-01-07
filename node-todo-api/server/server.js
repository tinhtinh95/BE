const express = require('express');
const bodyParser = require('body-parser');

const {ObjectId} =require('mongodb');
const {mongoose} =require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');

var app = express();

app.use(bodyParser.json());

const port = process.env.PORT || 3000;

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

app.get('/todos', (req, res) => {
    Todo.find().then(todos => {
        res.send({todos});
    }, (e) => {
        res.status(400).send(e);
    })
});

app.get('/todos/:id', (req, res)=> {
    // res.send(req.params);
    var id = req.params.id;
    if(!ObjectId.isValid(id)){
        return res.status(404).send('ID is invalid');
    }
    Todo.findById(id).then(todo => {
        if(!todo){
            return res.status(404).send('Can not found todo ');
        }
        return res.send({todo});
    }).catch(e => {
        res.status(400).send();
    })
});

app.delete('/todos/:id', (req, res)=> {
    var id = req.params.id;
    if(!ObjectId.isValid(id)){
        return res.status(404).send('ID is invalid');
    }
    Todo.findByIdAndRemove(id).then(todo => {
        if(todo) {
            return res.status(200).send(todo);
        }else {
            return res.status(404).send('Can not found todo');
        }
    }).catch(e => {
        return res.status(400).send();
    })
})

app.listen(port, () => {
    console.log(`Started on port ${port}`);
})

// var newUser = new User({
//     username: 'Tina   ',
//     password: '126456'
// }).save().then((doc) => {
//     console.log('Saved user success: ', JSON.stringify(doc, undefined, 2))
// }, (err) => {
//     console.log('Unable to save user: ', err)
// })
module.exports = {app};
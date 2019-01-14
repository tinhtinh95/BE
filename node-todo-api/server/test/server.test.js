const request = require('supertest');
const expect = require('expect');

const {ObjectID} = require('mongodb');
const {app} = require('./../server');
const {Todo} = require('../models/todo');

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
]

beforeEach(done => {
    // this.timeout(5000);
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => done());
})

describe('POST /todos', () => {
    it('should create a todo', (done) => {
        var text = "test todo";

        request(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if(err) {
                    return done(err);
                }
                Todo.find({text}).then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch(e => {
                    done(e)
                })
            })
    });
    it('should not create todo with invalid body data', (done) => {
        var text = "aa"
        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err, res) => {
                if(err) {
                    return done(err);
                }
                Todo.find({text}).then(todos => {
                    expect(todos.length).toBe(0);
                    done();
                }).catch(e => done(e))
            })
    });
});

describe('GET /todos', () => {
    it('should get all todos', (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect(res => {
                expect(res.body.todos.length).toBe(2)
            })
            .end(done)
    })
});

describe('GET /todos/:id', () => {
    it('should get a todo', (done) => {
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect(res => {
                expect(res.body.todo.text).toBe(todos[0].text)
            })
            .end(done)
    });
    it('should get 404 not found todo', (done) => {
        var id = new ObjectID().toHexString();
        request(app)
            .get(`/todos/${id}`)
            .expect(404)
            .end(done)
    });
    it('should get 404 invalid  ID', (done)=> {
        request(app)
            .get('/todos/dddididd113')
            .expect(404)
            .end(done)
    });
});

describe('DELETE /todos/:id', () => {
    it('should remove a todo', (done) => {
        var hexId = todos[0]._id.toHexString();
        console.log(hexId);
        request(app)
            .delete(`/todos/${hexId}`)
            .expect(200)
            .expect(res => {
                expect(res.body.todo._id).toBe(hexId);
            })
            .end((err, res) => {
                if(err){
                    return done(err);
                }
                Todo.findById(hexId).then(todo => {
                    expect(todo).toBeFalsy();
                    done();
                }).catch(err=>done(err))
            });
    });

    it('should return 404 if todo not found', (done) => {
        var id = new ObjectID().toHexString();
        request(app)
            .delete(`/todos/${id}`)
            .expect(404)
            .end(done)
    });

    it('should return 404 if objectId is invalid', (done) => {
        request(app)
            .delete('/todos/123dd')
            .expect(404)
            .end(done)
    });
});

describe('PATCH /todos/:id', () => {
    it('should update the todo', (done) => {
        const id = todos[0]._id.toHexString();
        const text = "Updating text"
        request(app)
            .patch(`/todos/${id}`)
            .send({
                text,
                completed: true
            })
            .expect(200)
            .expect(res => {
                expect(res.body.todo.text).toBe(text);
                expect(res.body.todo.completed).toBe(true);
                expect(typeof res.body.todo.completedAt).toBe('number');
            })
            .end(done);
    });

    it('should clear completedAt when todo is not completed', (done) => {
        const id = todos[1]._id.toHexString();
        const text = "Update the second text";
        request(app)    
            .patch(`/todos/${id}`)
            .send({
                text,
                completed: false
            })
            .expect(200)
            .expect(res => {
                expect(res.body.todo.text).toBe(text);
                expect(res.body.todo.completed).toBe(false);
                expect(res.body.todo.completedAt).toBeFalsy();
            })
            .end(done);
    })
})
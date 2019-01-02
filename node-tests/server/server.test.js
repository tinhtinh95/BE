const request = require('supertest');
const expect = require('expect');

var app = require('./server').app;
describe('Server', () => {
    describe('#Get /', () => {
        it('should return hello world response', (done) => {
            request(app)
                .get('/')
                .expect(404)
                .expect((res)=>{
                    expect(res.body).toInclude({
                        err: 'Page not found.'
                    });
                })
                .end(done);
        });
    })
    describe('#Get user', () => {
        it('should exist in user array', (done) => {
            request(app)
                .get('/user')
                .expect(200)
                .expect((res) => {
                    expect(res.body).toInclude({
                        name: 'Tina'
                    })
                })
                .end(done);
        })
    })
})

const expect = require('expect');
const rewire = require('rewire');

var app = rewire('./app');
// app.__get__ 

describe('App', () => {
    var db = {
        saveUser: expect.createSpy()
    };
    app.__set__('db', db);
    it('should call spy correctly', () => {
        var spy = expect.createSpy();
        spy('Tina', '23+');
        expect(spy).toHaveBeenCalledWith('Tina', '23+');
    });
    
    it('should call saveUser with use object', () => {
        var email = 'tina@enclave.vn';
        var password= 'Tinhtinh123123';

        app.handleSignUp(email, password);
        expect(db.saveUser).toHaveBeenCalledWith({email, password})
    })
})
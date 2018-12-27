const expect = require('expect');

const utils = require('./utils');

it('should add two numbers', () => {
    var res = utils.add(33, 11);
    // if(res !== 44){
    //     throw new Error(`Expected 44, but got ${res}.`);
    // }
    expect(res).toBe(44).toBeA('number');
});

it('should a square number', () => {
    var res = utils.square(3);
    // if(res!==9){
    //     throw new Error(`Expected 9, but got ${res}`);
    // }
    expect(res).toBe(9);
})

it('should set firstName and lastName', () => {
    var user = {location: 'London', age: 25};
    var res = utils.setName(user, 'Tina Nguyen');
    expect(res).toInclude({
        firstName: 'Tina',
        lastName: 'Nguyen',
    })
})

it('should async add two numbers', (done) => {
    utils.asyncAdd(4, '3', (sum) =>{
        expect(sum).toBe(7).toBeA('number');
        done();
    })
})
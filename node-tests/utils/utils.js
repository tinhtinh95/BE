module.exports.add = (a,b) =>{
    return a+b;
}

module.exports.square = (x) => x*x;

module.exports.setName = (user, fullName) => {
    var names = fullName.split(' ');
    user.firstName = names[0];
    user.lastName = names[1];
    return user;
}

module.exports.asyncAdd = (a, b, callBack) => {
    setTimeout(() =>{
        callBack(a+b);
    }, 1000)
}
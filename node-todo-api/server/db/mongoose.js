const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://tina:Tinhtinh123123@ds149984.mlab.com:49984/todoapp' || 'mongodb://localhost:27017/TodoApp');

module.exports = {
    mongoose
}
const env = process.env.NODE_ENV || 'development';
console.log('env: ', env);

if(env === "development" || env === "test"){
    const config = require('./config.json');
    console.log(config);
    const envConfig = config[env];

    // use Object.keys => to Array
    Object.keys(envConfig).forEach(key => {
        process.env[key] = envConfig[key];
    })
}

// if(env === 'development'){
//     process.env.PORT = 3000;
//     process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp';
// }else if(env === 'test'){
//     process.env.PORT = 3000;
//     process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest';
// }
// {
//     "test": {
//         "PORT": 3000,
//         "MONGODB_URI": "mongodb://localhost:27017/TodoApp",
//         "JWT_SECRET": "secretTina"
//     },
//     "development": {
//         "PORT": 3000,
//         "MONGODB_URI": "mongodb://localhost:27017/TodoAppTest",
//         "JWT_SECRET": "secretTina"
//     }
// }
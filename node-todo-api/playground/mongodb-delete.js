const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if(err) {
        return console.log('Unable to connect to Mongodb Server');
    }
    console.log('Connected to Mongodb Server');

    const db = client.db('TodoApp');

    // db.collection('Todos').deleteMany({text: 'Todo2'})
    //     .then((result) => {
    //         console.log('Delete success');
    //     }, (err) => {
    //         console.log('Can not delete: ', err)
    //     });

    db.collection('Todos').findOneAndDelete({
        _id: new ObjectID('5c2c8793b7db646a26904687')
        }).then((result) => {
            console.log('Delete success');
        }, (err) => {
            console.log('Can not delete: ', err)
        });

    client.close();
});

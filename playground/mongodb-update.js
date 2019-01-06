const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if(err) {
        return console.log('Unable to connect to Mongodb Server');
    }
    console.log('Connected to Mongodb Server');

    const db = client.db('TodoApp');

    db.collection('Todos').findOneAndUpdate({
        _id: new ObjectID('5c2d725bf65b8920413234f6')
        }, {
            $set: {
                completed: true,
            }
        }, {
            returnOriginal: false
        }).then((result) => {
            console.log('Update success', JSON.stringify(result, null, 2));
        }, (err) => {
            console.log('Can not update: ', err)
        });

    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID('5c2d725bf65b8920413234f7')
    }, {
        $set: {
            name: 'LSM',
        },
        $inc: {
            age: 2
        }
    }, {
        returnOriginal: false
    }).then((result) => {
        console.log(`Update success with: ${JSON.stringify(result, undefined, 2)}`)
    }, (err) => {
        console.log(`Update failed with error ${err}`)
    })

    client.close();
});

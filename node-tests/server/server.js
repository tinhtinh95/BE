const express = require('express');

var app = express();
app.get('/',( req, res) => {
    res.status(404).send({
        err: 'Page not found.',
        name: 'Test App v1.0'
    });
})

app.get('/user', (req,res) => {
    res.status(200).send([
        {name: 'Tina'},
        {name: 'Tina1'},
    ])
})

app.listen(3000, () => {
    console.log('Server is ready.');
})

module.exports.app = app;
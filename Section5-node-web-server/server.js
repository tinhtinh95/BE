const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname+ '/views/partials');
app.set('view engine', 'hbs');


app.use((req, res, next)=>{
    console.log(`Run before next: ${req.method}, ${req.url}`);
    var time = new Date().toString();
    var log = `time: ${time}:  ${req.method}, ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log+'\n', (err) =>{
        if(err) {
            console.log('Unable to append to server.log');
        }
    });

    next();
})

app.use((req, res, next)=>{
    res.render('maintenance.hbs');
})

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
}) 

hbs.registerHelper('upperCase', (text) => {
    return text.toUpperCase();
})
 
app.get('/', (req, res) => {
    // res.send('Express');
    // res.send('<h1>Express</h1>');
    // res.send({
    //     name: 'Tina',
    //     habits: [
    //         'music',
    //         'coding'
    //     ]
    // });
    res.render('home.hbs',{
        pageTitle: 'Home page',
        // currentYear: new Date().getFullYear(),
        welcomeMessage: 'Welcome to Express'
    })
});

app.use(express.static(__dirname + '/public'));

app.get('/about', (req, res)=> {
    res.render('about.hbs', {
        pageTitle: 'About page',
        // currentYear: new Date().getFullYear(),
    });
});

app.get('/bad', (req, res)=>{
    res.send({
        errMessage: 'Unable to handle request'
    })
})

app.listen(3000, () => {
    console.log('Server is ready');
});
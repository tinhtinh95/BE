const express = require('express');
const hbs = require('hbs');

var app = express();

hbs.registerPartials(__dirname+ '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next)=>{
    
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
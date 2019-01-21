const path = require('path')
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

// console.log(__dirname + '/../public');
// console.log(publicPath);
// vi thu muc public va server khac nhau nen dung path de goi den thu muc public

const express = require('express');
let app = express();

app.use(express.static(publicPath));

app.listen(port, () => {
    console.log(`Server is ready at port: ${port}`);
})


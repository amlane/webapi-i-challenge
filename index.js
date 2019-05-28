// implement your API here
const express = require('express');

const server = express();

server.get('/', (req, res) => {
    res.send('Hello World');
    
})

server.listen(8000, (req, res) => {
    console.log('api running on port 8000')
})
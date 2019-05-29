// implement your API here
const express = require('express');

const db = require('./data/db.js');

const server = express();

server.use(express.json()); //makes post and put work

server.get('/', (req, res) => {
    res.send('Hello World!');
})

server.post('/api/users', (req, res) => {
    const userInfo = req.body;
    db.insert(userInfo).then( user => {
        res.status(201).json(user)
    }).catch(error => {
        res.status(500).json({ message: 'error posting new user' })
    })
})

server.get('/api/users', (req, res) => {
    db.find().then( users => {
        res.status(200).json(users);
    } ).catch( error => {
        res.status(500).json({ message: 'error retrieving users' })
    })
})


server.listen(8000, (req, res) => {
    console.log('api running on port 8000')
})
// implement your API here
const express = require('express');

const db = require('./data/db.js');

const server = express();

server.use(express.json()); //makes post and put work

server.get('/', (req, res) => {
    res.send('Hello World!');
})

server.post('/api/users', (req, res) => {
    const { name, bio } = req.body;
    if(!name || !bio){
      return res.status(400).json({ message: "Please provide name and bio for the user." })
    }
    db.insert({ name, bio }).then( user => {
        res.status(201).json(user)
    }).catch(error => {
        res.status(500).json({ message: 'There was an error while saving the user to the database.' })
    })
})

server.get('/api/users', (req, res) => {
    db.find().then( users => {
        res.status(200).json(users);
    } ).catch( error => {
        res.status(500).json({ message: 'The users information could not be retrieved.' })
    })
})

server.get('/api/users/:id', (req, res) => {
    const id = req.params.id;
    db.findById(id).then(user => {
      if(user === 0){
        return res.status(404).json({ message: 'The user with the specified ID does not exist.' })
      } else {
        return res.status(200).json(user)
      }
    })
    .catch( error => {
        res.status(500).json({ message: 'The user information could not be retrieved.' })
    })
})

server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id;
    db.remove(id).then(deleted => {
      if(deleted === 0){
        return res.status(404).json({ message: "The user with the specified ID does not exist." })
      } 
        return res.status(204).end();
    })
    .catch(error => {
      res.status(500).json({ message: 'The user could not be removed.' })
  })
})

server.put('/api/users/:id', (req, res) => {
    const id = req.params.id;
    const changes = req.body;
    const { name, bio } = req.body;

    db.update(id, changes).then( updated => {
      if(updated === 0){
        res.status(404).json({ message: "The user with the specified ID does not exist." })
      } else if (!name || !bio) {
        res.status(400).json({ message: 'Please provide name and bio for the user.' })
      } else {
        res.status(200).json(updated);
      }
    })
    .catch(error => {
      res.status(500).json({ message: "The user information could not be modified." })
  })
})


server.listen(8000, (req, res) => {
    console.log('api running on port 8000')
})
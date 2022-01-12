const express = require('express');
const app = express.Router();

let users = [
  {
    id: 1,
    name: 'Luis',
    age: 34
  },
  {
    id: 2,
    name: 'Tony',
    age: 34
  },
  {
    id: 3,
    name: 'Greg',
    age: 40
  }
];

app.get('/users', (req, res) => {
  res.json(users);
});

app.get('/user/:id', (req, res) => {
  let user = users.find(user => user.id === +req.params.id);
  if(!user) {
    res.status(404);
    res.json('User not found');
  } else {
    res.json(user);
  }
});

app.post('/user', (req, res) => {
  let user = {
    id: users[users.length-1].id + 1,
    name: req.body.name,
    age: +req.body.age
  };
  users.push(user);
  res.json(user);
});

app.put('/user/:id', (req, res) => {
  let user = users.find(user => user.id === +req.params.id);
  if(!user) {
    res.status(404);
    res.json('User not found');
  } else {
    if(req.body.name && req.body.age) {
      user.name = req.body.name;
      user.age = +req.body.age;
      res.json(user);
    } else {
      res.status(400);
      res.json('Missing params');
    }
  }
});

app.delete('/user/:id', (req, res) => {
  let userIndex = users.findIndex(user => +user.id === +req.params.id);
  if(userIndex < 0) {
    res.status(404);
    res.json('User not found');
  } else {
    res.json(users[userIndex]);
    users.splice(userIndex, 1);
  }
});

module.exports = app;
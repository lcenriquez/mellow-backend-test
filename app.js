const express = require('express');
const users = require('./users');
const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
  next();
});
app.use(express.json());
app.use(users);

app.get('/', (req, res) => {
  res.json('Welcome to my API');
});

const server = app.listen(process.env.PORT || 8000, () => {
  const host = server.address().address
  const port = server.address().port
  console.log("Server listening at http://%s:%s", host, port)
});
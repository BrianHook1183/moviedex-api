require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const MOVIES = require('./movies-data-small.json');

const app = express();

app.use(morgan('dev'));

app.use(function validateBearerToken(req, res, next) {
  const authToken = req.get('Authorization');
  const apiToken = process.env.API_TOKEN;

  if (!authToken || authToken.split(' ')[1] !== apiToken) {
    return res.status(401).json({ error: 'Unauthorized request' });
  }
  next();
})

function handleGetMovie(req, res) {
  res.json(MOVIES);
};

app.get('/movie', handleGetMovie)




















const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
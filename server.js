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
  const qGenre = req.query.genre.toLowerCase();
  const qCountry = req.query.country.toLowerCase();
  const qRating = parseFloat(req.query.rating);
  const queries = `Genre is: ${qGenre}, Country is: ${qCountry}, and rating is: ${qRating}`;

  res.json(queries);
};

app.get('/movie', handleGetMovie)




















const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
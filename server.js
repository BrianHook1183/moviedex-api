require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const MOVIES = require('./movies-data-small.json');

const app = express();

app.use(morgan('dev'));
app.use(cors());

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
  const qRating = Number(req.query.rating);

  let response = MOVIES;

  if (qGenre) {
    response = response.filter(movie =>
      movie.genre.toLowerCase().includes(qGenre)
    )
  }
  if (qCountry) {
    response = response.filter(movie =>
      movie.country.toLowerCase().includes(qCountry)
    )
  }
  if (qRating) {
    response = response.filter(movie =>
      movie.avg_vote >= qRating
    )
  }


  if (!response.length) {
    response = '0 movies match this search, try adjusting your parameters';
  }

  res.json(response);
};

app.get('/movie', handleGetMovie)


const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
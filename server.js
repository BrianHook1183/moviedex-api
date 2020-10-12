require('dotenv').config();
const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));



function handleGetMovie(req, res) {
  res.send('this endpoint is working');
};

app.get('/movie', handleGetMovie)




















const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
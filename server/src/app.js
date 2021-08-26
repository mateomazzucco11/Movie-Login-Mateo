const express = require('express');

const app = express();

const moviesRoute = require('./routes/movies');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', moviesRoute);

module.exports = app;

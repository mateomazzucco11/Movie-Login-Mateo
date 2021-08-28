const express = require('express');
const app = express();
const login = require('./login/login');
const movies = require('./movies/movies');
const favorites = require('./favorites/favorites');

app.use('/', login);
app.use('/', movies);
app.use('/', favorites);

module.exports = app;
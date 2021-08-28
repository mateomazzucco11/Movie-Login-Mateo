const express = require('express');
const app = express();
const index = require('./routes/index');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', index);

module.exports = app;

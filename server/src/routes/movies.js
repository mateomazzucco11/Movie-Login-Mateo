const express = require('express');
const dataBase = require('../helpers/db/connect');
const jwt = require('jsonwebtoken');
const verifyToken = require('../middleware/verifyToken');

require('dotenv').config();

const app = express();

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({
        msg: 'There is no email or password',
      });
  }

  dataBase.query('SELECT email, password, admin FROM users WHERE email = ? AND password = ?', [email, password], (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({
          msg: 'There was a problem on the server',
        });
    }
    if (result.length === 0) {
      return res
        .status(400)
        .json({
          msg: 'The email or password entered are invalid',
        });
    }

    const accessToken = jwt.sign({email: email}, process.env.ACCESS_TOKEN, {
      expiresIn: 86400, //24hs
    });

    const [{admin}] = result

    return res
      .status(200)
      .json({
        msg: 'Successful entry',
        accessToken,
        admin,
      });
  });

});

app.get('/movies', (_,res) => {

  dataBase.query('SELECT id, year, title, description, director, cast, image FROM movies', (err,result) => {
    if(err){
      return res
        .status(500)
        .json({
          msg: 'There was a problem on the server',
        });
    }
    if(result.length === 0) {
      return res
        .status(400)
        .json({
          msg: 'No movie found'
        });
    }

    return res
      .status(200)
      .json({
        result
      });
  });
  
});

app.post('/movie', verifyToken, (req, res) => {
  
  dataBase.query('SELECT admin FROM user')

});

app.get('/favorites', (req,res) => {
  
});

app.post('/favorites', (req,res) => {

});



module.exports = app;

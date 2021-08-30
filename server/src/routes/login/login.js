const express = require('express');
const dataBase = require('../../helpers/db/connect');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .json({
        msg: 'There is no email or password',
      })
      .status(400)
  }

  dataBase.query('SELECT id, email, password, admin FROM users WHERE email = ? AND password = ?', [email, password], (err, result) => {
  if (err) {
    return res
      .status(500)
      .json({
        msg: 'There was a problem on the server',
      });
  }
  if (result.length === 0) {
    return res
      .json({
        msg: 'The email or password entered are invalid',
      })
      .status(400)
  }

  const [{admin, id}] = result

  const accessToken = jwt.sign({ admin, id}, process.env.ACCESS_TOKEN, {
    expiresIn: 86400, //24hs
  });

  return res
    .status(200)
    .json({
      msg: 'Successful entry',
      accessToken,
    });
  });
  
});

module.exports = app;
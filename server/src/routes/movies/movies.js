const express = require('express');
const dataBase = require('../../helpers/db/connect');
const verifyToken = require('../../middleware/verifyToken');
require('dotenv').config();

const app = express();

app.get('/movies', (_,res) => {
  dataBase.query('SELECT id, year, title, description, director, cast, image FROM movies WHERE del = ?', ['false'], (err,result) => {
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
          msg: 'There are no movies in the database',
        });
    };

    return res
      .status(200)
      .send(result)
  });
  
});

app.post('/movies', verifyToken, (req,res) => {
  const { title, year, gender, description, director, cast, image } = req.body;

  if(req.admin === 'false' ) {
    return res
      .status(400)
      .json({
        msg: 'This user is not an administrator',
      });
  };

  dataBase.query('INSERT INTO movies SET title = ?, year = ?, gender = ?, description = ?, director = ?, cast = ?, image = ?', [title, year, gender, description, director, cast, image], (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({
          msg: 'There was a problem on the server',
        });
    };

    if(result.changedRows > 0) {
      return res
        .status(200)
        .json({
          msg:'Movie added successfully',
        });
    } else {
      return res
        .status(400)
        .json({
          msg: 'Could not be added',
        });
    };
  })
})

app.put('/movies/:id', verifyToken, (req, res) => {
  const { title, year, gender, description, director, cast, image } = req.body;
  const { id } = req.params;

  if(req.admin === 'false' ) {
    return res
      .status(400)
      .json({
        msg: 'This user is not an administrator',
      });
  };

  dataBase.query('UPDATE movies SET title = ?, year = ?, gender = ?, description = ?, director = ?, cast = ?, image = ? WHERE id = ?', [title, year, gender, description, director, cast, image, id], (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({
          msg: 'There was a problem on the server',
        });
    };

    if(result.changedRows > 0) {
      return res
        .status(200)
        .json({
          msg:'Edited successfully',
        });
    } else {
      return res
        .status(400)
        .json({
          msg: 'Could not be edited',
        });
    };
  });
});

app.delete('/movies/:id', verifyToken, (req,res) => {
  const { id } = req.params;

  if(req.admin === 'false' ) {
    return res
      .status(400)
      .json({
        msg: 'This user is not an administrator',
      });
  };

  dataBase.query('UPDATE movies SET del = ? WHERE id = ?', ['true', id], (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({
          msg: 'There was a problem on the server',
        })
    }

    if(result.changedRows > 0) {
      return res
        .status(200)
        .json({
          msg:'Delete successfully',
        });
    } else {
      return res
        .status(400)
        .json({
          msg: 'Could not be removed',
        });
    };
  });
});

module.exports = app;

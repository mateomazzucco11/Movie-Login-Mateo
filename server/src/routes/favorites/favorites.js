const express = require('express');
const app = express();
const dataBase = require('../../helpers/db/connect');
const verifyToken = require('../../middleware/verifyToken');

require('dotenv').config();

app.get('/favorites/:id', verifyToken, (req,res) => {
  const { id } = req.params

  dataBase.query('SELECT id, title, year, gender, description, director, cast, image, del FROM movies INNER JOIN favorites ON favorites.movie_id = movies.id WHERE favorites.user_id = ?', id, (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({
          msg: 'There was a problem on the server',
        });
    };

    return res
      .status(200)
      .json({
        msg: 'Favorites',
        result
      });
  });
});

app.post('/favorites', (req, res) => {
  const { movie_id, user_id } = req.body;

  dataBase.query('INSERT INTO favorites (movie_id, user_id) VALUES (?, ?)', [movie_id, user_id], (err, result) => {
    if(err) {
      return res
        .status(500)
        .json({
          msg: 'It is already added from favorites',
        });
    };

    if(result.affectedRows > 0) {
      return res
        .status(200)
        .json({
          msg:'Successfully added to favorites',
        });
    };
  });
});

app.delete('/favorites', verifyToken, (req, res) => {
  const { user_id, movie_id } = req.body

  dataBase.query('DELETE FROM favorites WHERE user_id = ? AND movie_id = ?', [user_id, movie_id], (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({
          msg: 'There was a problem on the server',
        });
    };

    if(result.affectedRows > 0) {
      return res
        .status(200)
        .json({
          msg:'Removed from favorites successfully',
        });
    } else {
      return res
        .status(400)
        .json({
          msg: 'It is already removed from favorites',
        });
    };
  });
});

module.exports = app;
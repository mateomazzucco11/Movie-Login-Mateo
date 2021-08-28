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

    const [{admin}] = result

    const accessToken = jwt.sign({email, admin}, process.env.ACCESS_TOKEN, {
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
    }

    return res
      .status(200)
      .send(result)
  });
  
});

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
        })
    }

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
    }
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
    }

  })
})

app.get('/favorites/:id', verifyToken, (req,res) => {
  const { id } = req.params

  dataBase.query('SELECT id, title, year, gender, description, director, cast, image, del FROM movies INNER JOIN favorites ON favorites.movie_id = movies.id WHERE favorites.user_id = ?', id, (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({
          msg: 'There was a problem on the server',
        })
    }

    return res
    .status(200)
    .json({
      msg: 'Favorites',
      result
    })
  })
});

app.post('/favorites', (req, res) => {
  const { movie_id, user_id } = req.body;

  dataBase.query('INSERT INTO favorites (movie_id, user_id) VALUES (?, ?)', [movie_id, user_id], (err, result) => {
    if(err) {
      return res
        .status(500)
        .json({
          msg: 'It is already added from favorites',
        })
    }

    if(result.affectedRows > 0) {
      return res
        .status(200)
        .json({
          msg:'Successfully added to favorites',
        });
    } 
  })
})

app.delete('/favorites', verifyToken, (req, res) => {
  const { user_id, movie_id } = req.body

  dataBase.query('DELETE FROM favorites WHERE user_id = ? AND movie_id = ?', [user_id, movie_id], (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({
          msg: 'There was a problem on the server',
        })
    }

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

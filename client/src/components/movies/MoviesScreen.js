import React, { useEffect, useState } from 'react';
import { getMovies } from '../../helpers/getMovies';

import jwt from 'jsonwebtoken';

import { MovieCard } from './MovieCard';
import { NavBar } from './NavBar';

export const MoviesScreen = ({category}) => {
  const [movies, setMovies] = useState([])
  const secretKey = process.env.REACT_APP_SECRET_KEY
  
  let dataUser = {
    admin: '',
    email: '',
  };
  let token;

  if (localStorage.getItem('accessToken')) {
    token = localStorage.getItem('accessToken')
    dataUser = jwt.verify(token, secretKey);
  }

  const {admin, email} = dataUser

  useEffect(() => {
    getMovies(category)
      .then(movies => setMovies(movies))
  }, [category])

  return (
    <div className='movies__screen-content'>
      <NavBar admin={admin}/>
      <ul className='movies__content'>
        {
          movies.map(data => (
            <MovieCard
              key={data.id}
              {...data}
              admin={admin}
            />
          ))
        }
      </ul>
    </div>
  )
}

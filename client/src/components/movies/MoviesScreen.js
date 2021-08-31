import React, { useEffect, useState } from 'react';
import { getMovies } from '../../helpers/getMovies';

import jwt from 'jsonwebtoken';

import { MovieCard } from './MovieCard';
import { NavBar } from './NavBar';

export const MoviesScreen = () => {
  const [movies, setMovies] = useState([])
  const secretKey = process.env.REACT_APP_SECRET_KEY
  
  let dataUser = {
    admin: '',
    id: '',
  };
  let token;

  if (localStorage.getItem('accessToken')) {
    token = localStorage.getItem('accessToken')
    dataUser = jwt.verify(token, secretKey);
  }


  const {admin, id:userId} = dataUser

  useEffect(() => {
    getMovies()
      .then(movies => setMovies(movies))
  }, [])

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
              userId={userId}
              token={token}
            />
          ))
        }
      </ul>
    </div>
  )
}

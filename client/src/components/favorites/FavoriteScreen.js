import jwt from 'jsonwebtoken';
import React, { useEffect, useState } from 'react';
import { getFavorites } from '../../helpers/getFavorites';
import { NavBar } from '../movies/NavBar';
import { FavoriteCard } from './FavoriteCard';

export const FavoriteScreen = () => {
  const [favorites, setFavorites] = useState({
    result: [],
    msg: ''
  })
  const secretKey = process.env.REACT_APP_SECRET_KEY;

  let dataUser = {
    id: '',
    admin: '',
  };
  let token;

  if (localStorage.getItem('accessToken')) {
    token = localStorage.getItem('accessToken')
    dataUser = jwt.verify(token, secretKey);
  }

  const {id:userId, admin} = dataUser

  useEffect(() => {
    getFavorites({userId, token})
      .then((favorites) => setFavorites({
        result: favorites.moviesFavorites,
        msg: favorites.msg,
      }))
  }, []);

  const {result} = favorites

  return (
    <div>
      <NavBar admin={admin}/>
      <ul className='movies__content'>
        {
          (result.length > 0)
          ?
          result.map(data => (
            <FavoriteCard
              key={data.id}
              {...data}
              token={token}
              userId={userId}
            />
          ))
          :
          <p>
            No hay favoritos
          </p>
        }
      </ul>
    </div>
  )
}

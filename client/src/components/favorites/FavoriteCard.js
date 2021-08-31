import React, { useState } from 'react';
import axios from 'axios';

export const FavoriteCard = ({
  title,
  image,
  year,
  description,
  cast,
  director,
  id,
  token,
  userId
}) => {
  const [activedesc, setActivedesc] = useState(false)

  const handleClickDeleteFavorites = async(e) => {
    e.preventDefault();

    await axios({
      method: 'delete',
      url: `${process.env.REACT_APP_LOCALHOST}:${process.env.REACT_APP_PORT}/favorites`,
      data: {
        user_id: userId,
        movie_id: id,
      },
      headers: {
        accesstoken: token,
      },
      validateStatus: () => {
        return true;
      }
    })

    window.location.reload()
  }
  return (
    <li className='movies__card-content'>
        <div className='movies__content-title'>
          <h1>{title}</h1>
        </div>
        <div className='movies__content-image'>
          <img
            src={image}
            alt={title}
            className='movies__card-image'
          />
        </div>
        <button
        onClick={()=> setActivedesc(true)}
        className='description-button'
        >
          See more information.
        </button>
        <button
          className='favorite-button'
          onClick={handleClickDeleteFavorites}
        >
          💔
        </button>
        {
          (activedesc)
          ?
          <button
            onClick={()=> setActivedesc(false)}
            className='movies__content-description'
          >
            <p><span>Year:</span> {year}</p>
            <p><span>Description:</span> {description}</p>
            <p><span>Casting:</span> {cast}</p>
            <p><span>Director:</span> {director}</p>
          </button>
          :
          null
        }
        
    </li>
  )
}

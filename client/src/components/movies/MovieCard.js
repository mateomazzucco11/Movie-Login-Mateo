import React, { useState } from 'react'

export const MovieCard = ({
  image,
  title,
  cast,
  description,
  director,
  year,
  admin,
}) => {
  const [activedesc, setActivedesc] = useState(false)
  const token = localStorage.getItem('accessToken');


  return (
    <li className='movies__card-content'>
        <div className='movies__content-title'>
          <h1>{title}</h1>
          {
            (token)
            ?
            <>
              <button
                className='favorite-button'
              >
                💜
              </button>
              {
                (admin === 'true')
                ?
                <button
                className='edit-button'
                >
                  ✏️
                </button>
                :
                null
              }
            </>
            :
            null
          }
        </div>
        <div className='movies__content-image'>
          <img
            src={image}
            alt={title}
            className='movies__card-image'
          />
        </div>
        {
          (token)
          ?
          <>
            <button
            onClick={()=> setActivedesc(true)}
            className='description-button'
            >
              See more information.
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
          </>
          :
          null
        }
    </li>
  )
}

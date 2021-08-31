import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from '../../hooks/useForm';

export const MovieCard = ({
  image,
  title,
  cast,
  description,
  director,
  gender,
  year,
  admin,
  id,
  userId,
  token
}) => {
  const [activedesc, setActivedesc] = useState(false)
  const [showEdit, setShowEdit] = useState(false)

  const handleClickFavorites = async(e) => {
    e.preventDefault();

    await axios
      .post(`${process.env.REACT_APP_LOCALHOST}:${process.env.REACT_APP_PORT}/favorites`,{
        user_id: userId,
        movie_id: id,
      }, {
        headers: {
          accesstoken: token,
        }
      })
  }

  const handleClickDeleteMovie = async(e) => {
    e.preventDefault();

    await axios({
      method: 'delete',
      url: `${process.env.REACT_APP_LOCALHOST}:${process.env.REACT_APP_PORT}/movies/${id}`,
      headers: {
        accesstoken: token,
      },
      validateStatus: () => {
        return true;
      }
    })

    window.location.reload();
  }

  const [formValue, handleInputChange] = useForm({
    title: '',
    year: '',
    gender: '',
    description: '',
    director: '',
    cast: '',
    image: '',
  })

  const handleSubmitEdit = async(e) => {
    e.preventDefault();

    try {
      await axios({
        method: 'put',
        url: `${process.env.REACT_APP_LOCALHOST}:${process.env.REACT_APP_PORT}/movies/${id}`,
        data: {
          title: formValue.title,
          year: formValue.year,
          gender: formValue.gender,
          description: formValue.description,
          director: formValue.director,
          cast: formValue.cast,
          image: formValue.image,
        },
        headers: {
          accesstoken: token,
        },
        validateStatus: () => {
          return true;
        }
      })
    }
    catch(err) {
      console.log(err)
    }

    window.location.reload();
  }

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
                onClick={handleClickFavorites}
              >
                💜
              </button>
              {
                (admin === 'true')
                ?
                <>
                  <button
                    className='edit-button'
                    onClick={()=> setShowEdit(!showEdit)}
                  >
                    ✏️
                  </button>
                  <button
                    className='remove-button'
                    onClick={handleClickDeleteMovie}
                  >
                    ❌
                  </button>
                  <form
                    className={`${(showEdit) ? 'edit-movie-on' : 'edit-movie-off'} `}
                    onSubmit={handleSubmitEdit}
                  >
                    <input
                      type='text'
                      name='title'
                      placeholder='Enter movie title *'
                      onChange={handleInputChange}
                      value={(title) ? title : ''}
                    />
                    <input 
                      type='number'
                      name='year'
                      min='1900'
                      max='2022'
                      placeholder='Enter movie year *'
                      onChange={handleInputChange}
                      value={(year) ? year : ''}
                    />
                    <input 
                      type='text'
                      name='gender'
                      placeholder='Enter movie gender'
                      onChange={handleInputChange}
                      value={(gender) ? gender : ''}
                    />
                    <input 
                      type='text'
                      name='description'
                      placeholder='Enter movie description'
                      onChange={handleInputChange}
                      value={(description) ? description : ''}
                    />
                    <input 
                      type='text'
                      name='director'
                      placeholder='Enter movie director'
                      onChange={handleInputChange}
                      value={(director) ? director : ''}
                    />
                    <input 
                      type='text'
                      name='cast'
                      placeholder='Enter movie casting'
                      onChange={handleInputChange}
                      value={(cast) ? cast : ''}
                    />
                    <input 
                      type='text'
                      name='image'
                      placeholder='Enter url image'
                      onChange={handleInputChange}
                      value={(image) ? image : ''}
                    />
                    <button type='submit'>
                      Submit the edit
                    </button>
                  </form>
                </>
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
            src={(image === '')? image='data:image/png;base64,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': image}
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
                <p><span>Year:</span> {(year) ? '' : year}</p>
                <p><span>Description:</span> {(description) ? '' : description}</p>
                <p><span>Casting:</span> {(cast) ? '' : cast}</p>
                <p><span>Director:</span> {(director) ? '' : director}</p>
                <p><span>Gender:</span> {(gender) ? '' : gender}</p>
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

import React from 'react';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { useHistory } from 'react-router-dom'
import { useForm } from '../../hooks/useForm';
import { NavBar } from './NavBar';

export const AddMovie = () => {
  const secretKey = process.env.REACT_APP_SECRET_KEY
  const history = useHistory();

  let token;
  let dataUser = {
    admin: '',
  };

  if (localStorage.getItem('accessToken')) {
    token = localStorage.getItem('accessToken')
    dataUser = jwt.verify(token, secretKey);
  }

  const {admin} = dataUser

  const [formValue, handleInputChange] = useForm({
    title: '',
    year: '',
    gender: '',
    description: '',
    director: '',
    cast: '',
    image: '',
  })

  const handleSubmitMovie = async(e) => {
    e.preventDefault();

    try {
      await axios({
        method: 'post',
        url: `${process.env.REACT_APP_LOCALHOST}:${process.env.REACT_APP_PORT}/movies`,
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

    history.push('/')
    window.location.reload();
  }

  return (
    <>
      <NavBar admin={admin} />
      <div className='addmovie__content'>
        <form
        onSubmit={handleSubmitMovie}
        
        >
          <input
            type='text'
            name='title'
            placeholder='Enter movie title *'
            onChange={handleInputChange}
          />
          <input 
            type='number'
            name='year'
            min='1900'
            max='2022'
            placeholder='Enter movie year *'
            onChange={handleInputChange}
            required
          />
          <input 
            type='text'
            name='gender'
            placeholder='Enter movie gender'
            onChange={handleInputChange}
          />
          <input 
            type='text'
            name='description'
            placeholder='Enter movie description'
            onChange={handleInputChange}
          />
          <input 
            type='text'
            name='director'
            placeholder='Enter movie director'
            onChange={handleInputChange}
          />
          <input 
            type='text'
            name='cast'
            placeholder='Enter movie casting'
            onChange={handleInputChange}
          />
          <input 
            type='text'
            name='image'
            placeholder='Enter url image'
            onChange={handleInputChange}
          />
          <button type='submit'>
            Submit the movie
          </button>
        </form>
      </div>
    </>
  )
}

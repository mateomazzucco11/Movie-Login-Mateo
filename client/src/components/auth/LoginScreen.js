import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import axios from 'axios';

export const LoginScreen = () => {
  const [ error, setError ] = useState(false)
  let history = useHistory();
  
  const [formValues, handleInputChange] = useForm({
    email: '',
    password: ''
  });
  

  const handleSubmit = async(e) => {
    e.preventDefault();

    try{
      const fetchLogin = await axios.post('http://localhost:3003/login', {
        email: formValues.email,
        password: formValues.password
      })

      if(fetchLogin.data.accessToken){
        localStorage.setItem('accessToken', fetchLogin.data.accessToken);
        history.push('/')
      }else {
        setError(!false)
      }
    }
    catch(err) {
      alert('There was an error on the server')
    }
  }

  return (
    <>
      <div>
        <h1>Login</h1>

        <form onSubmit={handleSubmit}>
          <input 
            autoComplete='off'
            type='email'
            placeholder='Enter email'
            name='email'
            value={formValues.email}
            onChange={handleInputChange}
            required
          />
          <input 
            autoComplete='off'
            type='password'
            placeholder='Enter password'
            name='password'
            value={formValues.password}
            onChange={handleInputChange}
            required
          />
          
          <button
            type='submit'
          >
            Login
          </button>
        </form>
      </div>
      {
        error
        ?
        <div>
          <p>The username or password is incorrect</p>
          <button onClick={()=> setError(false)}>
            Try Again
          </button>
        </div>
        :
        null
      }
    </>
  )
}
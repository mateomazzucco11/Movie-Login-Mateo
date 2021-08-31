import React from 'react'
import { Link, useHistory } from 'react-router-dom'

export const NavBar = ({admin}) => {
  const history = useHistory();

  const handleClick = () => {
    if(admin){
      localStorage.removeItem('accessToken')
      history.push('/auth/login')
    }else {
      history.push('/auth/login')
    }
  }

  return (
    <div className='navbar__content'>
      {
        (admin)
        ?
        <>
          <Link
            to='/'
          >
            Home
          </Link>
          <Link
            to='/favorites'
          >
            Favorites
          </Link>
        </>
        :
        null
      }
      {
        admin
        ?
          (admin === 'false')
          ?
            <p>
              User: <span className='not-privileged'>Not privileged</span>
            </p>
          :
            <>
              <p>
                User: <span className='privileged'>Privileged</span>
              </p>
              <Link
                to='/addmovie'
              >
                Addmovie
              </Link>
            </>
        :
        null
      }
      <button
      onClick={handleClick}
      >
        {
          (admin)
          ?
          'Logout'
          :
          'Login'
        }
      </button>
    </div>
  )
}

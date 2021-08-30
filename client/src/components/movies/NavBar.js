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
    <div>
      {
        (admin)
        ?
        <Link
          to='/favorites'
        >
          Favorites
        </Link>
        :
        null
      }
      {
        admin
        ?
          (admin === 'false')
          ?
            <p>
              User: <span>Not privileged</span>
            </p>
          :
            <p>
              User: <span>Privileged</span>
            </p>
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

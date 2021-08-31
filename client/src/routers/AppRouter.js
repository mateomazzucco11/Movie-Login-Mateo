import React from 'react'
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from 'react-router-dom';

import { FavoriteScreen } from '../components/favorites/FavoriteScreen';
import { AddMovie } from '../components/movies/AddMovie';
import { MoviesScreen } from '../components/movies/MoviesScreen'
import { AuthRouter } from './AuthRouter'

export const AppRouter = () => {
  return (
    <Router className='max-width'>
      <div className='max-width'>
        <Switch>
          <Route
            path='/auth'
            component={AuthRouter}
          />
          <Route 
            exact
            path='/'
            component={MoviesScreen}
          />
          <Route 
            exact
            path='/favorites'
            component={FavoriteScreen}
          />
          <Route
            exact
            path='/addmovie'
            component={AddMovie}
          />

          <Redirect to='/' />
        </Switch>
      </div>
    </Router>
  )
}

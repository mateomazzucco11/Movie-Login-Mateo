import React from 'react'
import {
    BrowserRouter as Router,
    Redirect,
    Route,
    Switch
} from 'react-router-dom';

import { MoviesScreen } from '../components/movies/MoviesScreen'
import { AuthRouter } from './AuthRouter'

export const AppRouter = () => {
    return (
        <Router>
            <div>
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

                    <Redirect to='/auth' />
                </Switch>
            </div>
        </Router>
    )
}

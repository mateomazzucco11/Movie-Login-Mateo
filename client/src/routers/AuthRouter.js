import React from 'react';
import {
    Route,
    Redirect,
    Switch,
} from 'react-router-dom';

import { LoginScreen } from '../components/auth/LoginScreen'

export const AuthRouter = () => {
    return (
        <div>
            <Switch>
                <Route 
                    exact
                    path='/auth/login'
                    component={LoginScreen}
                />

                <Redirect to='/auth/login' />
            </Switch>
        </div>
    )
}

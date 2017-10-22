import React from 'react';
import { Route, Redirect, } from 'react-router-dom';

import session from '../../lib/session';

function renderRoute(props, cProps, Component) {
    const isAuthenticated = session.isLoggedIn;

    return isAuthenticated ? (
        <Component {...props} {...cProps} />
    ) : (
            <Redirect to={{
                pathname: '/login',
                state: { from: props.location }
            }} />
        );
}

const PrivateRoute = ({ component: Component, componentProps: cProps, ...rest }) => (
    <Route {...rest} render={props => renderRoute(props, cProps, Component)} />
);

export default PrivateRoute;
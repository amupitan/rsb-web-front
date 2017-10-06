import React from 'react';
import { Switch, Route } from 'react-router-dom'

import Home, { appRoutes } from '../Home'
import SignUp from '../SignUp'
import Login from '../Login'
import NotFound from '../NotFound';


// The Main component renders one of matching route
const Main = () => (
  <main>
    <Switch>
      <Route exact path='/signup' component={SignUp} />
      <Route exact path='/login' component={Login} />
      <Route exact path={appRoutes} component={Home} />
      <Route path='*' component={NotFound} />
    </Switch>
  </main>
);

export default Main;
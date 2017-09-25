import React from 'react';
import { Switch, Route } from 'react-router-dom'

import Home from '../Home'
import SignUp from '../SignUp'
import Login from '../Login'
import NotFound from '../NotFound'

// The Main component renders one of matching route
const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/signup' component={SignUp} />
      <Route exact path='/login' component={Login} />
      <Route path='*' component={NotFound} />
    </Switch>
  </main>
);

export default Main;
import React from 'react';
import { Switch, Route } from 'react-router-dom'

import Home from '../Home'
import NotFound from '../NotFound'

// The Main component renders one of matching route
const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='*' component={NotFound}/>
    </Switch>
  </main>
);

export default Main;
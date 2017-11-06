import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'

import { deepFreeze } from "../../lib/utils";

import PrivateRoute from '../containers/PrivateRoute';

import Home, { appRoutes } from '../Home'
import SignUp from '../SignUp'
import Login from '../Login'
import NotFound from '../NotFound';

import Notify from '../ui/Notify';

// The Main component renders one of matching route
class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notify: null,
    }

    this.close = this.close.bind(this);
    this.notify = this.notify.bind(this);
    this.renderNotification = this.renderNotification.bind(this);
  }

  notify({ title, message, type }) {
    this.setState({ notify: { title: title, message: message, type: type } })
  }

  close(evt) {
    this.setState({ notify: null })
  }

  renderNotification() {
    if (this.state.notify) {
      return <Notify {...this.state.notify} onClose={this.close} />
    }
  }

  render() {
    const notify = deepFreeze({ show: this.notify, hide: this.close });
    return (
      <main>
        {this.renderNotification()}
        <Switch>
          <Route exact path='/signup' render={(props) => <SignUp notify={notify} {...props} />} />
          <Route exact path='/login' render={(props) => <Login notify={notify} {...props} />} />
          <PrivateRoute exact path={appRoutes} component={Home} componentProps={{ notify: notify }} />
          <PrivateRoute exact path='/user/:username?' component={Home} componentProps={{ notify: notify }} />
          <PrivateRoute exact path='/history/:username?' component={Home} componentProps={{ notify: notify }} />
          <Route path='*' component={NotFound} />
        </Switch>
      </main>
    );
  }
}

export default Main;
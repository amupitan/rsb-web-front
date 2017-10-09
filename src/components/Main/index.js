import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'

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
      updateApp: true,
    }

    this.close = this.close.bind(this);
    this.notify = this.notify.bind(this);
    this.renderNotification = this.renderNotification.bind(this);
  }

  notify({ title, text, type }) {
    this.setState({ notify: { title: title, text: text, type: type }, updateApp: false })
  }


  close(evt) {
    this.setState({ notify: null })
  }

  renderNotification() {
    if (this.state.notify) {
      return <Notify {...this.state.notify} onClose={this.close} />
    }
  }

  componenDidUpdate() {
    window.history.pushState({ info: null }, '')
  }

  render() {
    return (
      <main>
        {this.renderNotification()}
        <AppController update={this.state.updateApp}>
          <Switch>
            <Route exact path='/signup' component={SignUp} />
            <Route exact path='/login' render={(props) => <Login notify={this.notify} {...props} />} />
            <Route exact path={appRoutes} component={Home} />
            <Route path='*' component={NotFound} />
          </Switch>
        </AppController>

      </main>
    );
  }
}

class AppController extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.update;
  }

  render() {
    return <div>{this.props.children}</div>
  }
}

export default Main;
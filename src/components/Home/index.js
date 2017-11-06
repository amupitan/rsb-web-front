import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import session from '../../lib/session';

import HamburgerMenu from '../HamburgerMenu';
import views from './views';

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showMenu: false,
    }

    this.userInfo = session.user;

    this.componentWillUpdate = this.componentWillUpdate.bind(this);
    this.toggeleMenu = this.toggeleMenu.bind(this);
  }

  componentWillUpdate() {
    this.userInfo = session.user;
  }

  toggeleMenu() {
    this.setState({
      showMenu: !this.state.showMenu,
    })
  }

  render() {
    const defaultPath = this.props.default || (views.length > 0 && views[0].path);
    return (
      <div>
        <HamburgerMenu user={this.userInfo} views={views.filter((view) => view.isMenuOption)} onClick={this.toggeleMenu} menu={this.state.showMenu} />
        <div className='display'>
          <Switch>
            {views.filter((view) => !view.noRoute).map((view, i) => (
              <Route exact key={`${view.name}${i}`} path={'/' + view.path} render={(props) => <view.component {...props} {...this.props} />} />
            ))}
            {/* Default route when url is '/' */}
            <Redirect to={{ pathname: '/' + defaultPath }} />
          </Switch>
        </div>
      </div>
    );
  }
}

// Returns a regex representing all the routes
// An example is /(map|game|friends|)/
// The reason for the last '|' is to match '/'
// which is when there's only a slash
// The user route is viewUser component
export const appRoutes = (() => {
  let path = '/(';
  for (let route of views) {
    if (route.noRoute) continue;
    path += route.path + '|'
  }
  path += ')/';
  return path;
})();

export default Home;
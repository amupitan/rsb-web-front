import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import HamburgerMenu from '../HamburgerMenu';
import views from './views';
import user from '../../lib/user';
import ViewUser from '../ViewUser';
import Users from './users';

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showMenu: false,
    }

    this.toggeleMenu = this.toggeleMenu.bind(this);
  }

  toggeleMenu() {
    this.setState({
      showMenu: !this.state.showMenu,
    })
  }

  render() {
    const defaultComp = this.props.default || (views.length > 0 && views[0].component);
    let use = new user().getAllUsers().result;
    return (
      <div>
        <HamburgerMenu views={views} onClick={this.toggeleMenu} menu={this.state.showMenu} />
        <div className='display'>
          <Switch>
            <Route path='/user' component={Users}/>

            {views.map((view, i) => (
              <Route exact key={`${view.name}${i}`} path={'/' + view.path} render={(props) => <view.component {...props} {...this.props} />} />
            ))}
            {/* Default route when url is '/' */}
            const default = 
            <Route render={(props) => <defaultComp {...props} {...this.props} />} />
          </Switch>
        </div>
      </div>
    );
  }
}


// {use.map((u, i) => (
//   < Route exact key={`${u.Username}${i}`} path={'/user/' + u.Username}
//   render={(props) => (
//     <ViewUser {...props} userInfo={u}/>
//   )}/>
// ))},


// Returns a regex representing all the routes
// An example is /(map|game|friends|)/
// The reason for the last '|' is to match '/'
// which is when there's only a slash
export const appRoutes = (() => {
  let path = '/(';
  for (let route of views) {
    path += route.path + '|'
  }
  path += ')/';
  return path;
})();

export const userRoutes = (() => {
  let path = '/user/(';
  for (let userRoutes of new user().getAllUsers().result){
    path+= userRoutes.Username + '|'
  }
  path += ')/';
  return path;
})();

export default Home;
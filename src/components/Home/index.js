import React, { Component } from 'react';
import HamburgerMenu from '../HamburgerMenu';

class Home extends Component {

  menuOptions = ["Map","Current Game","Profile","Settings","Host"];

  render() {
    return (
      <div>
        <HamburgerMenu
          menuOptions={this.menuOptions}
        />
      </div>
    );
  }
}

export default Home;

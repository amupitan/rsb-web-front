import React, { Component } from 'react';
import HamburgerMenu from '../HamburgerMenu';
import QuickAccess from '../QuickAccess';


class Home extends Component {

  menuOptions = ["Map","Current Game","Profile","Settings","Host"];

  render() {
    return (
      <div>
        <HamburgerMenu
          menuOptions={this.menuOptions}
        />

        <QuickAccess
          content={
            [
              {
                title: "Host",
                visible: false,
                buttonType: "primary qa-button",

              },
              {
                title: "Sport",
                visible: false,
                buttonType: "primary qa-button",

              },
              {
                title: "Open",
                visible: true,
                buttonType: "primary qa-button",
              },
              {
                title: "Back",
                visible: false,
                buttonType: "primary qa-button",

              }
            ]
          }

        />
      </div>
    );
  }
}

export default Home;

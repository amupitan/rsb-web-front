import React, { Component } from 'react';
// import './App.css';
import HamburgerMenu from '../HamburgerMenu';
import QuickAccess from '../QuickAccess';



class Home extends Component {
  render() {
    return (
      <div>
        {/* <div className="widgets"> */}
        <HamburgerMenu 
          menuOptions={
            [
              {
                optionName: "Map"
              },
              {
                optionName: "Current Game"
              },
              {
                optionName: "Profile"
              },
              {
                optionName: "Settings"
              }
            ]
          }
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

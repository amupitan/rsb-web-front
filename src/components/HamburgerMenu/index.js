import React, { Component } from 'react';
import RSBLabel from '../ui/RSBLabel';
import RSBButton from '../ui/RSBButton';
import ProfileUser from '../ProfileUser';
import CurrentGame from '../CurrentGame';
import MapPage from '../MapPage';
import './style.css';

class HamburgerMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuOptions: this.props.menuUptions,
      menuWidth: 0,
      displayPage: "Map"
    }

    //ES6 React.Component doesn't auto bind methods to itself. You need to bind them yourself
    this.render = this.render.bind(this);
    this.handleMenuClick = this.handleMenuClick.bind(this);
  }

  /**
   * Wanted to have own MapKey because of things like "Current Game" vs "CurrentGame". It's also a little neater in my opinion
   * 
   */
  MenuOptions = ["Map", "CurrentGame", "Profile", "Settings"]

 /**
  * All encompassing map for the options that comes in the hamburger menu
  *
  * clickFunction: Function that happens when the label is clicked
  * displayJSX: What is displayed on the page
  *
  */
  LebronMap = new Map([
    [this.MenuOptions[0], {
      clickFunction: () => {
        this.setState(() => ({
          displayPage: this.MenuOptions[0],
          menuWidth: '0px',
        }));
      },
      displayJSX: <MapPage/>
    }],
    [this.MenuOptions[1], {
      clickFunction: () => {
        this.setState(() => ({
          displayPage: this.MenuOptions[1],
          menuWidth: '0px',
        }));
      },
      displayJSX: <CurrentGame/>
    }],
    [this.MenuOptions[2], {
      clickFunction: () => {
        this.setState(() => ({
          displayPage: this.MenuOptions[2],
          menuWidth: '0px',
        }));
      },
      displayJSX: <ProfileUser/>
    }],
    [this.MenuOptions[3], {
      clickFunction: () => {
        this.setState(() => ({
          displayPage: this.MenuOptions[3],
          menuWidth: '0px',
        }));
      },
      displayJSX: <h1>Settings Page</h1>
    }]
  ]);


  //called whenever the menu button is pressed
  handleMenuClick() {
    this.setState((prev) => ({
      menuWidth: (prev.menuWidth === '250px' ? '0px' : '250px'),
    }));
  }

  render() {
    const menuWidth = this.state.menuWidth;
    const menuOptions = this.props.menuOptions;
    let renderMenu;

    //case for open menu and options to select page
    if (menuWidth ==="250px") {
      renderMenu =
        <div>
          <div className="rsb-menu" style={{ width: menuWidth }}>
            <div>
              {menuOptions.map((menuOp, i) => {
                return <RSBLabel key={i}
                  className="menu-option"
                  name={menuOp.optionName}
                  styleClass='menu-option'
                  //Has to use the MapKey instead of menuOp.optionName because menuOp has things like "Current Game", when the key is "CurrentGame"
                  onClickFunction={this.LebronMap.get(this.MenuOptions[i]).clickFunction}
                />;
              })}
            </div>
            <span className="menu-close" onClick={() => {
              this.handleMenuClick();
            }}>&times;
          </span>
          </div>
        </div>
    }

    //renders the basic menu button
    else {
      renderMenu =
        <RSBButton
          glyphicons="glyphicon glyphicon-menu-hamburger"
          onClickFunction={this.handleMenuClick}
          className="test-hamburger"
        />
    }

    return (
      <div>
        {renderMenu}
        {this.LebronMap.get(this.state.displayPage).displayJSX}
      </div>
    );
  }
}

export default HamburgerMenu;

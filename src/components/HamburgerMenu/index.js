import React, { Component } from 'react';
import RSBLabel from '../ui/RSBLabel';
import './style.css';

class HamburgerMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuOptions: this.props.menuUptions,
      menuIsOpen: false,
      menuWidth: 0
    }

    //ES6 React.Component doesn't auto bind methods to itself. You need to bind them yourself
    this.render = this.render.bind(this);
  }

  handleClick() {
    if (this.state.menuIsOpen) {
      this.setState(() => ({
        menuWidth: '0px'
      }));
    }
    else {
      this.setState(() => ({
        menuWidth: '250px'
      }));
    }
    this.setState((prevState => ({
      menuIsOpen: !prevState.menuIsOpen
    })));
  }

  handleProfileClick() {
    console.log("Clicked profile button"); /**TODO: Produce ProfilePage Modal */
  }

  render() {
    const menuOpen = this.state.menuIsOpen;
    const menuWidth = this.state.menuWidth;
    const menuOptions = this.props.menuOptions;

    if (menuOpen) {
      return (
        <div className="rsb-menu" style={{ width: menuWidth }}>
          <div>
            {menuOptions.map((menuOp, i)=> {
              let handleFunction;

              switch (menuOp.optionName) {
                case "Profile":
                  handleFunction = this.handleProfileClick;
                  break;
                default:
                  handleFunction = () => {
                    console.log("Clicked RSBLabel")
                  }
              }
              return <RSBLabel key={i} className="menu-option"
                name={menuOp.optionName}
                onClickFunction={handleFunction}
                styleClass = 'menu-option'
              />;
            })}
          </div>

          <span className="menu-close" onClick={() => {
            this.handleClick();
          }}>&times;
          </span>
        </div>
      );
    }
    else {
      return (
        <div className="container-fluid row top-bar">
          <div className="col-xs-sm-1">
            <div className="test-hamburger" onClick={() => {
              this.handleClick();
            }}>&#9776;
            </div>
          </div>
        </div>
      );
    }
  }
}

export default HamburgerMenu;

import React, { Component } from 'react';
import RSBLabel from '../ui/RSBLabel';
import ProfileUser from '../ProfileUser';
import './style.css';

class HamburgerMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuOptions: this.props.menuUptions,
      menuIsOpen: false,
      menuWidth: 0,
      displayProfile: false
    }

    //ES6 React.Component doesn't auto bind methods to itself. You need to bind them yourself
    this.render = this.render.bind(this);
    this.handleProfileClick = this.handleProfileClick.bind(this);
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
    console.log("Clicked profile button"); //Can remove later
    this.setState(() => ({
      displayProfile: !this.state.displayProfile
    }));
  }

  render() {
    const menuOpen = this.state.menuIsOpen;
    const menuWidth = this.state.menuWidth;
    const menuOptions = this.props.menuOptions;

    let renderPage;


      console.log("this is: ", this);

    if (this.state.displayProfile) {
      console.log("Inside display Profile");
      return (
        <div>
          <ProfileUser
            onCloseFunction = {this.handleProfileClick}
          />
        </div>
      )
    }

    else if (menuOpen) {
      console.log("Inside menuOpen", this.state.displayProfile);
      renderPage = 
        <div>
          <div className="rsb-menu" style={{ width: menuWidth }}>
            <div>
              {menuOptions.map((menuOp, i) => {
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
                  styleClass='menu-option'
                  modalName={menuOp.optionName}
                />;
              })}
            </div>

            <span className="menu-close" onClick={() => {
              this.handleClick();
            }}>&times;
          </span>
          </div>
        </div>
    }
    else {
      console.log("Else");
      renderPage = 
        <div className="container-fluid row top-bar">
          <div className="col-xs-sm-1">
            <div className="test-hamburger" onClick={() => {
              this.handleClick();
            }}>&#9776;
            </div>
          </div>
        </div>
    }

    return (renderPage);
  }
}

export default HamburgerMenu;

import React, { Component } from 'react';
import RSBLabel from '../ui/RSBLabel';
import RSBButton from '../ui/RSBButton';
import ProfileUser from '../ProfileUser';
import CurrentGame from '../CurrentGame';
import './style.css';

class HamburgerMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuOptions: this.props.menuUptions,
      menuIsOpen: false,
      menuWidth: 0,
      currentOption : ""
    }

    //ES6 React.Component doesn't auto bind methods to itself. You need to bind them yourself
    this.render = this.render.bind(this);
    this.handleProfileClick = this.handleProfileClick.bind(this);
    this.handleCurrentGameClick = this.handleCurrentGameClick.bind(this);
    this.handleMenuOpen = this.handleMenuOpen.bind(this);
    this.handleMenuClose = this.handleMenuClose.bind(this);
  }

  //Funtion called when the menu is open and closed, page doesn't change
  handleMenuClose(){
    this.setState(() => ({
      menuWidth: '0px',
      menuIsOpen : false,
    }));
  }

  //called whenever the menu button is opened
  handleMenuOpen() {
    console.log("this shit was clicked");
    this.setState(() => ({
      menuWidth: '250px',
      menuIsOpen: true,
    }));
  }

  //called when the profile click option is selected
  handleProfileClick() {
    this.setState(() => ({
      currentOption: "profile",
      menuWidth : "0px",
      menuIsOpen : false
    }));
  }

  //called when the current game option is clicked
  handleCurrentGameClick() {
    this.setState(() => ({
      currentOption: "currentGame",
      menuWidth : "0px",
      menuIsOpen : false
    }));
  }

  render() {
    const menuOpen = this.state.menuIsOpen;
    const menuWidth = this.state.menuWidth;
    const menuOptions = this.props.menuOptions;
    const currentOption = this.state.currentOption;

    let renderPage;
    let renderMenu;

    if (menuOpen) {
      renderMenu =

        <div>
          <div className="rsb-menu" style={{ width: menuWidth }}>
            <div>
              {menuOptions.map((menuOp, i) => {
                let handleFunction;

                switch (menuOp.optionName) {
                  case "Profile":
                    handleFunction = this.handleProfileClick;
                    break;
                  case "Current Game":
                    handleFunction = this.handleCurrentGameClick;
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
              this.handleMenuClose();
            }}>&times;
          </span>
          </div>
        </div>
    }
    else {
      renderMenu =
        <RSBButton
          glyphicons="glyphicon glyphicon-menu-hamburger"
          onClickFunction={this.handleMenuOpen}
          className="test-hamburger"
        />
    }

    if (currentOption === "profile") {
      renderPage =
        <div>
          <ProfileUser
            onCloseFunction={this.handleProfileClick}
          />
        </div>
    }
    else if(currentOption === "currentGame"){
      renderPage =
        <div>
          <CurrentGame
            onCloseFunction={this.handleCurrentGameClick}
          />
        </div>
    }
    else{
      //This will eventually reneder the map page since this will be default
      renderPage = <div></div>
    }

    //Putting the Menu and page togther
    let returnValue = [];
    returnValue.push(renderMenu);
    returnValue.push(renderPage);

    var finalPage = returnValue.map(function(x, i) {
      return <div key={i}>{x}</div>;
    });

    return (
      <div>
        {finalPage}
      </div>
    );
  }
}

export default HamburgerMenu;

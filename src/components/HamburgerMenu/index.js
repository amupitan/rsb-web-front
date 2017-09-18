import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
// import '../App.css';
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
    if(this.state.menuIsOpen){
      this.setState(() => ({
        menuWidth: '0px'
      }));
    }
    else{
      this.setState(() => ({
        menuWidth: '250px'
      }));
    }
    this.setState((prevState => ({
      menuIsOpen: !prevState.menuIsOpen
    })));
    console.log(this.state.menuIsOpen);
    console.log(this.state.menuWidth);
  }

  render() {
    const menuOpen = this.state.menuIsOpen;
    const menuWidth = this.state.menuWidth;
    const menuOptions = this.props.menuOptions;

    console.log(menuOptions);
    if(menuOpen){
      return(       
        <div className="rsb-menu" style={{width: menuWidth}}>
          <div>
            {menuOptions.map(function (menuOption) {
              return <span className="menu-option">{menuOption.optionName}</span>;
            })}
          </div>

          <span className="menu-close" onClick={() => {
              this.handleClick();
              console.log("Closed hambuger menu");
              }}>&times;
          </span>
       </div>
      );
    }
    else{
      return (
        <div className="container-fluid row top-bar">
          <div className="col-xs-sm-1">
             <div className="test-hamburger" onClick={() => {
                this.handleClick();
                console.log("Clicked hambuger menu");
                }}>&#9776;
            </div>
          </div>
        </div>
      );
    }
  }
}

  export default HamburgerMenu;

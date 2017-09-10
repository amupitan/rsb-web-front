import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (

      /**
       * Keeping the old code in here to reference to when we create components
       */
      // <div className="App">
      //   <div className="App-header">
      //     <img src={logo} className="App-logo" alt="logo" />
      //     <h2>Welcome to React</h2>
      //   </div>
      //   <p className="App-intro">
      //     To get started, edit <code>src/App.js</code> and save to reload.
      //   </p>
      // </div>
      <div className="widgets">
        <div className="container-fluid row top-bar">
          <div className="col-xs-1" >
            <button className="btn-block glyphicon glyphicon-menu-hamburger" id="hamburger-menu" />
          </div>
          <div className="input-group input-group-lg col-xs-11" >
            <span className="glyphicon glyphicon-search input-group-addon" id="search-bar"></span>
            <input type="text" className="form-control" placeholder="Username" aria-describedby="search-bar" />
          </div>
        </div>
        <div className="quick-access">
          <buttom className="glyphicon glyphicon-plus" />
        </div>
      </div>
    );
  }
}

export default App;

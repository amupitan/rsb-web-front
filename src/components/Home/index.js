import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import classnames from 'classnames';

import './style.css';

class Home extends Component {

    // static propTypes = {}
    // static defaultProps = {}

    render() {
        return (
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

export default Home;

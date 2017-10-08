import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './style.css';

class Join extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }

        //ES6 React.Component doesn't auto bind methods to itself. You need to bind them yourself
        this.render = this.render.bind(this);
    }

    render() {
        return (
            <div>
                <h1>Join Game</h1>
            </div>
        )
    }
}

export default Join;

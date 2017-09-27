import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './style.css';

class CurrentGame extends Component {
    constructor(props) {
        super(props);
        this.render = this.render.bind(this);
    }

    render() {
        return (
            <div className="text-center">
                Hello World 
            </div>
        )
    }
}

export default CurrentGame;

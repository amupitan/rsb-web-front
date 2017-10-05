import React, { Component } from 'react';

import './style.css';

class Friends extends Component {
    constructor(props) {
        super(props);
        this.render = this.render.bind(this);
    }

    render() {

        return (
            <h6 className="text-center">
               Friends Page
            </h6>
   
        )
    }
}

export default Friends;
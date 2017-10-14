import React, { Component } from 'react';
import {getUser, getHeading, getFriends, getGameHistory}from './controller';

import './style.css';

class ViewUser extends Component {
    constructor(props) {
        super(props);
        this.render = this.render.bind(this);
        console.log("In here, ", props);
    }

    render() {
        const userInstance = getUser(this.props.match.params.username);
        return (
            <div className="panel col-xs-10 col-xs-offset-1">
                {getHeading(userInstance)}
                <div className="row">
                    {getFriends(userInstance)}
                    {getGameHistory(userInstance)}
                </div>
            </div >
        )
    }
}

export default ViewUser

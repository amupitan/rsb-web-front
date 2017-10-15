import React, { Component } from 'react';
import RSBButton from '../ui/RSBButton';
import { Link } from 'react-router-dom';

import './style.css';

export default class DisplayFriends extends Component {
    constructor(props) {
        super(props);
        this.render = this.render.bind(this);
    }

    genFriends() {
        let users = [];
        this.props.friends.forEach((el, i) => {
            users.push(
                <div className="populate-requests row" key={i}>
                    <div className="col-sm-4 col-sm-pull">
                        <Link to={'/user/' + el.Username} >
                            <img src={el.ProfilePic} alt="Profile" className="profile-pic-xs" />
                        </Link>
                    </div>
                    <div className="col-sm-4">
                        <Link key={i} to={'/user/' + el.Username}>{el.Username}</Link>
                    </div>
                    <div className="col-sm-4">
                        <RSBButton
                            glyphicons="glyphicon glyphicon-remove"
                            className="decline"
                            onClickFunction={() => {
                                console.log("Decline!");
                            }}
                        />
                    </div>
                </div>);
        });
        return users;
    }

    render() {
        return (
            <div>
                {this.genFriends()}
            </div>
        );
    }
}
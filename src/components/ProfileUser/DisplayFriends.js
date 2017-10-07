import React, { Component } from 'react';
import RSBLabel from '../ui/RSBLabel';
import RSBButton from '../ui/RSBButton';
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
                        <img src={el.ProfilePic} alt="Profile" className="profile-pic-xs" />
                    </div>
                    <div className="col-sm-4">
                        <RSBLabel
                            name={el.Username}
                            onClickFunction={() => {
                                console.log("Pressed ", el.Firstname, el.Lastname);
                            }}
                            key={i}
                        />
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
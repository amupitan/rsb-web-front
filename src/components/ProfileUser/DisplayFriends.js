import React, { Component } from 'react';
import RSBLabel from '../ui/RSBLabel';
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
                <div className="friends-generate" key={i}>
                    <img src={el.ProfilePic} alt="Profile" className="profile-pic-xs" />
                    <RSBLabel
                        name={el.Username}
                        onClickFunction={() => {
                            console.log("Pressed ", el.Firstname, el.Lastname);
                        }}
                        key={i}
                    /></div>);
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
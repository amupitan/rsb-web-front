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
            console.log("El", el);
            users.push(
                <div className="friends-generate">
                <RSBLabel
                    name={el.Username}
                    onClickFunction= {()=>{
                        console.log("Pressed friend ", el.Username);
                    }}
                    key={i}
                /></div>);
        }, this);
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
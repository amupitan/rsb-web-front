import React, { Component } from 'react';

import { getFriends, getName } from '../../lib/user';
import { Notifiable } from "../../mixins";

import RSBUserImage from '../ui/RSBUserImage';
import { LoaderPage } from '../ui/Loader';
import defaultImg from '../../dummy/default.jpg';

import './style.css';

class Friends extends Notifiable(Component) {

    constructor(props) {
        super(props);
        this.state = {
            friendSearch: ""
        }

        this.render = this.render.bind(this);
        this.filterUsers = this.filterUsers.bind(this);
    }

    componentWillMount() {
        this.getAllFriends();
    }

    async getAllFriends() {
        const username = getName();
        const friends = await getFriends(username);
        this.setState({
            userFriends: friends
        });
        return friends;
    }

    filterUsers(event) {
        const array = this.state.userFriends;
        const keyword = event.target.value
        let newArray = [];
        for (let i = 0; i < array.length; ++i) {
            if (array[i].username.toLowerCase().includes(keyword.toLowerCase())) {
                newArray.push(array[i]);
            }
        }
        this.setState({
            filteredFriends: newArray,
            friendSearch: keyword
        });
    }

    renderUsers(array) {
        return array.map((user, i) => {
            return <RSBUserImage
                name={user.username}
                imgUrl={user.ImageURL || defaultImg}
                imgHeight="85px"
                imgWidth="85px"
                className="col-xs-3 text-center"
                key={i}
            />
        })
    }

    render() {
        if (!this.state || !this.state.userFriends) {
            return <LoaderPage />
        }
        return (
            <div className="panel-group col-xs-10 col-xs-offset-1">
                <div className="panel panel-default rsb-friends-panel">
                    <div className="panel-heading text-center">
                        <h3>Your Friends</h3>
                        <input className="" type="search" value={this.state.friendSearch} id="rsb-friends-search-bar" placeholder="Search Friends.." onChange={this.filterUsers} />
                    </div>
                    <div className="panel-body">
                        <div className="row">
                            {this.renderUsers(this.state.filteredFriends || this.state.userFriends)}
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}

export default Friends;
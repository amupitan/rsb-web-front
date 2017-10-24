import React, { Component } from 'react';

import { getFriends, getName } from '../../lib/user';
import { Notifiable } from "../../mixins";

import RSBUserImage from '../ui/RSBUserImage';
import { LoaderPage } from '../ui/Loader';
import mockServer from '../../dummy';
import defaultImg from '../../dummy/default.jpg';

import './style.css';

let data = mockServer("/user/f/1");

class Friends extends Notifiable(Component) {

    constructor(props) {
        super(props);
        this.render = this.render.bind(this);
        this.filterUsers = this.filterUsers.bind(this);
        this.handleFriendSearch = this.handleFriendSearch.bind(this);
        this.state = {
            friendSearch: ""
        }
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

    filterUsers(array, keyword) {
        let newArray = [];
        for (let i = 0; i < array.length; ++i) {
            if (array[i].username.toLowerCase().includes(keyword.toLowerCase())) {
                newArray.push(array[i]);
            }
        }
        this.setState({
            userFriends: newArray
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

    handleFriendSearch(event) {
        this.setState({
            friendSearch: event.target.value
        });
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
                        <input className="" type="search" value={this.state.friendSearch} id="rsb-friends-search-bar" placeholder="Search Friends.." onChange={this.handleFriendSearch} />
                        <button type="submit"
                            onClick={
                                () => {
                                    this.filterUsers(this.state.userFriends,
                                        this.state.friendSearch)
                                }
                            }>
                            <span className="glyphicon glyphicon-search"></span>
                        </button>
                    </div>
                    <div className="panel-body">
                        <div className="row">
                            {this.renderUsers(this.state.userFriends)}
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}

export default Friends;
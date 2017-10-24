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
        this.renderUsers = this.renderUsers.bind(this);
        this.filterUsers = this.filterUsers.bind(this);
        this.handleFriendSearch = this.handleFriendSearch.bind(this);
        this.handleRecentSearch = this.handleRecentSearch.bind(this);
        this.state = {
            //     currentRecents: data.result[0].RecentPlayers,
            //     friendSearch: "",
            //     recentSearch: ""
        }
    }

    componentWillMount() {
        this.getAllFriends();
    }

    async getAllFriends() {
        const username = getName();
        console.log("username: ", username)
        const friends = await getFriends(username);
        console.log("Friends: ", friends);
        this.setState({
            userFriends: friends
        });
        console.log("state: ", this.state)
        return friends;
    }

    filterUsers(array, keyword, arrayName) {
        let newArray = [];
        for (let i = 0; i < array.length; ++i) {
            if (array[i].Username.toLowerCase().includes(keyword.toLowerCase())) {
                newArray.push(array[i]);
            }
        }
        if (arrayName === 'friends') {
            this.setState({
                userFriends: newArray
            });
        }
        if (arrayName === "recents") {
            this.setState({
                currentRecents: newArray
            });
        }
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

    handleRecentSearch(event) {
        this.setState({
            recentSearch: event.target.value
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
                                    this.filterUsers(data.result[0].Friends,
                                        this.state.friendSearch,
                                        "friends")
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
                {/* <div className="panel panel-default rsb-recent-players-panel">
                    <div className="panel-heading text-center">
                        <h3 className="">Recent Players</h3>
                        <input className="" type="search" value={this.state.recentSearch} id="rsb-recent-players-search-bar" placeholder="Search Recent.." onChange={this.handleRecentSearch} />
                        <button type="submit"
                            onClick={
                                () => {
                                    this.filterUsers(data.result[0].RecentPlayers,
                                        this.state.recentSearch,
                                        "recents")
                                }
                            }>
                            <span className="glyphicon glyphicon-search"></span>
                        </button>
                    </div>
                    <div className="panel-body">
                        <div className="row">
                            {this.renderUsers(this.state.currentRecents)}
                        </div>
                    </div> */}
                {/* </div> */}
            </div >
        )
    }
}

export default Friends;
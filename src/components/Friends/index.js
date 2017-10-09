import React, { Component } from 'react';
import RSBUserImage from '../ui/RSBUserImage';
import mockServer from '../../dummy';

import './style.css';

let data = mockServer("/user/f/1");

class Friends extends Component {

    constructor(props) {
        super(props);
        this.render = this.render.bind(this);
        this.renderUsers = this.renderUsers.bind(this);
        this.filterUsers = this.filterUsers.bind(this);
        this.handleFriendSearch = this.handleFriendSearch.bind(this);
        this.handleRecentSearch = this.handleRecentSearch.bind(this);
        this.state = {
            currentFriends: data.result[0].Friends,
            currentRecents: data.result[0].RecentPlayers,
            friendSearch: "",
            recentSearch: ""
        }
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
                currentFriends: newArray
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
                name={user.Username}
                imgUrl={user.ImageURL}
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
        return (
            <div className="panel-group col-xs-10 col-xs-offset-1">
                <div className="panel panel-default rsb-friends-panel">
                    <div className="panel-heading text-center">
                        <h3>Your Friends</h3>
                        <input className="" type="search" value={this.state.friendSearch} id="rsb-friends-search-bar" placeholder="Search Friends.." onChange={this.handleFriendSearch}/>
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
                            {this.renderUsers(this.state.currentFriends)}
                        </div>
                    </div>
                </div>
                <div className="panel panel-default rsb-recent-players-panel">
                    <div className="panel-heading text-center">
                        <h3 className="">Recent Players</h3>
                        <input className="" type="search" value={this.state.recentSearch} id="rsb-recent-players-search-bar" placeholder="Search Recent.." onChange={this.handleRecentSearch}/>
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
                    </div>
                </div>
            </div>
        )
    }
}

export default Friends;
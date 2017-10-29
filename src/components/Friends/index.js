import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { getFriends, getLoggedInUserName } from '../../lib/user';
import { Notifiable } from "../../mixins";

import { LoaderPage } from '../ui/Loader';
import Avatar from '../ui/Avatar';

import './style.css';

class Friends extends Notifiable(Component) {

    constructor(props) {
        super(props);
        this.state = {
            friendSearch: '',
            userFriends: [],
        }

        this.render = this.render.bind(this);
        this.filterUsers = this.filterUsers.bind(this);
    }

    componentDidMount() {
        this.getAllFriends();
    }

    async getAllFriends() {
        const username = getLoggedInUserName();
        const friends = await getFriends(username);
        if (!friends.error) {
            this.setState({
                userFriends: friends
            });
        }
    }

    filterUsers(event) {
        const allFriends = this.state.userFriends;
        const keyword = event.target.value
        let filteredFriends = [];
        for (let i = 0; i < allFriends.length; ++i) {
            if (allFriends[i].username.toLowerCase().includes(keyword.toLowerCase())) {
                filteredFriends.push(allFriends[i]);
            }
        }
        this.setState({
            filteredFriends: filteredFriends,
            friendSearch: keyword
        });
    }

    renderUsers(users) {
        if (users.length === 0) 
            return <div>No friends with the name '{this.state.friendSearch}' were found</div>

        return users.map((user, i) => (
                <Link to={`/user/${user.username}`} key={i} >
                    <div className='col-xs-3 text-center'>
                        <Avatar avatar={user.avatar} alt='profile-pic' className='rsb-friend-icon' />
                        <span className='rsb-friend-name'>{user.username}</span>
                    </div>
                </Link>
        ));
    }

    render() {
        if (!this.state.userFriends) {
            return <LoaderPage />
        }
        return (
            <div className="panel-group col-xs-10 col-xs-offset-1">
                <div className="panel panel-default rsb-friends-panel">
                    <div className="panel-heading text-center">
                        <h3>Your Friends</h3>
                        <input type="search" value={this.state.friendSearch} id="rsb-friends-search-bar" placeholder="Search Friends..." onChange={this.filterUsers} />
                    </div>
                    <div className="panel-body">
                        <div className="row">
                            {/*This either displays the filtered array of friends or all the friends */}
                            {this.renderUsers(this.state.filteredFriends || this.state.userFriends)}
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}

export default Friends;
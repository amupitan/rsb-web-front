import React, { Component } from 'react';
import classNames from 'classnames';

import { Link } from 'react-router-dom';

import { getFriends, getLoggedInUserName } from '../../lib/user';
import { sendGameInvite } from '../../lib/game';
import { Notifiable } from "../../mixins";

import RSBButton from '../ui/RSBButton';
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
        this.renderUsers = this.renderUsers.bind(this);
    }

    componentDidMount() {
        this.getAllFriends();
    }

    async getAllFriends() {
        const username = getLoggedInUserName();
        const friends = await getFriends(username);
        if (!friends.error) {
            for (let i = 0; i < friends.length; ++i) {
                friends[`${i}`].selectStatus = false;
            }
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

    selectFriend(i) {
        let stateCopy = this.state.userFriends;
        stateCopy[i].selectStatus = this.state.userFriends[i].selectStatus ? 0 : 1;
        this.setState({
            userFriends: stateCopy
        })
    }

    getClassSet(user) {
        let classSet = classNames(
            'col-xs-3',
            'text-center',
            {
                'user-select': user.selectStatus
            }
        )
        return classSet;
    }

    renderUsers(users) {
        if (users.length === 0)
            return <div>No friends with the name '{this.state.friendSearch}' were found</div>

        /* `this.props.location.state` is undefined when this component is accessed 
         * from the hamburger menu, and has `{from: "/game"}` when it gets here from 
         * trying to invite people from CurrentGame. 
         */
        if (this.props.location.state) {
            return users.map((user, i) => (
                <div className={this.getClassSet(user)} onClick={() => { this.selectFriend(i) }} key={i}>
                    <Avatar avatar={user.avatar} alt='profile-pic' className='rsb-friend-icon' />
                    <span className='rsb-friend-name'>{user.username}</span>
                </div>
            ));
        }
        else {
            return users.map((user, i) => (
                <Link to={`/user/${user.username}`} key={i} >
                    <div className='col-xs-3 text-center'>
                        <Avatar avatar={user.avatar} alt='profile-pic' className='rsb-friend-icon' />
                        <span className='rsb-friend-name'>{user.username}</span>
                    </div>
                </Link>
            ))
        }
    }

    displayInvite() {
        if (this.props.location.state) {
            return (
                <RSBButton
                    text="Invite"
                    buttonType="success"
                    onClickFunction={() => {
                        for (let i in this.state.userFriends) {
                            if (this.state.userFriends[i].selectStatus) {
                                sendGameInvite(this.state.userFriends[i].username)
                            }
                        }

                    }}
                />)
        }
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
                        <input className='rsb-friend-search' type="search" value={this.state.friendSearch} id="rsb-friends-search-bar" placeholder="Search Friends..." onChange={this.filterUsers} />
                    </div>
                    <div className="panel-body">
                        <div className="row">
                            {/*This either displays the filtered array of friends or all the friends */}
                            {this.renderUsers(this.state.filteredFriends || this.state.userFriends)}
                        </div>
                        {this.displayInvite()}
                    </div>
                </div>
            </div >
        )
    }
}

export default Friends;
import React, { Component } from 'react';
import classNames from 'classnames';

import { Link } from 'react-router-dom';

import { getFriends, getLoggedInUserName } from '../../lib/user';
import Game, { sendGameInvite } from '../../lib/game';
import subscription, { subscriptions } from '../../lib/subscriptions';
import { unsafeCopy } from "../../lib/utils";
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
            numSelected: 0,
        }

        this.subscriber = subscription.subscriber;

        this.render = this.render.bind(this);
        this.filterUsers = this.filterUsers.bind(this);
        this.renderUsers = this.renderUsers.bind(this);
        this.displayInvite = this.displayInvite.bind(this);
        this.getFriendInfo = this.getFriendInfo.bind(this);
        this.updateFriends = this.updateFriends.bind(this);
    }

    componentDidMount() {
        this.getFriendInfo();
        this.createSubscriptions();
    }

    /**
    * Makes subscriptions to necessary socket events
    */
    createSubscriptions() {
        this.subscriber.multiple([
            subscription.subscribe({
                name: subscriptions.UNFRIEND_USER,
                action: this.updateFriends()
            }),
            subscription.subscribe({
                name: subscriptions.RESPONSE_FRIEND_INVITE,
                action: this.updateFriends(true)
            }),
        ]);
    }

    updateFriends(respondToInvite) {
        return (res) => {
            if (respondToInvite && !res.accept) return;
            this.getFriendInfo();
        }
    }

    async getFriendInfo() {
        const displayInvite = this.props.location.pathname === '/invite' && await this.getGameMembers();
        this.getAllFriends(displayInvite)
    }

    async getGameMembers() {
        const game = await Game();
        if (game.error) {
            this.setState({
                errorFatal: game.error,
            });
            return false;
        }
        this.setState({
            game: game
        });
        return true;
    }

    async getAllFriends(isInGame) {
        const username = getLoggedInUserName();
        const friends = await getFriends(username);
        if (!friends.error && isInGame) {
            const { members } = this.state.game;

            for (const friend of friends) {
                if (this.state.game.host.username === friend.username) {
                    friend.selectStatus = gameStatus.IN_GAME;
                    continue;
                }

                for (const member of members) {
                    if (member.username === friend.username) {
                        friend.selectStatus = gameStatus.IN_GAME;
                        break;
                    }
                }

                if (friend.selectStatus !== gameStatus.IN_GAME)
                    friend.selectStatus = gameStatus.NOT_SELECTED;
            }
        }
        this.setState({
            userFriends: friends
        });
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
        let numSelected = this.state.numSelected;
        const friends = unsafeCopy(this.state.userFriends),
            friend = friends[i];
        if (friend.selectStatus === gameStatus.IN_GAME) return;

        if (friend.selectStatus === gameStatus.SELECTED) {
            friend.selectStatus = gameStatus.NOT_SELECTED;
            numSelected--;
        } else {
            friend.selectStatus = gameStatus.SELECTED
            numSelected++;
        }

        this.setState({
            userFriends: friends,
            numSelected: numSelected
        })
    }

    getClassSet(user) {
        return classNames(
            'col-xs-3',
            'text-center',
            'rsb-friend-user-box',
            {
                'user-select': (user.selectStatus === gameStatus.SELECTED),
                'user-in-game': (user.selectStatus === gameStatus.IN_GAME)
            }
        )
    }

    renderUsers(users) {
        if (this.state.userFriends.length === 0 || users.error) {
            return <div>User has no friends at this time</div>
        }

        if (users.length === 0) {
            return <div>No friends with the name '{this.state.friendSearch}' were found</div>
        }

        if (this.props.location.pathname === '/invite') {
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
        if (!(this.props.location && this.props.location.pathname === '/invite')) return null;

        if (this.state.numSelected === 0) {
            return <div className='rsb-friends-invite'><RSBButton text="Invite" buttonType="success" className="disabled rsb-friends-invite-button" /></div>
        }

        const handleInviteClick = () => {
            const userFriends = this.state.userFriends;
            for (const friend of this.state.userFriends) {
                if (friend.selectStatus === gameStatus.SELECTED) {
                    sendGameInvite(friend.username)
                    friend.selectStatus = gameStatus.NOT_SELECTED;
                }
            }
            this.setState({ userFriends: userFriends });
        };

        return (
            <div className='rsb-friends-invite'>
                <Link to={'/game'}>
                    <RSBButton text="Invite" buttonType="success" onClickFunction={handleInviteClick} className='rsb-friends-invite-button' />
                </Link>
            </div>
        );
    }

    componentWillUnmount() {
        this.subscriber.clearSubscriptions();
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

const gameStatus = {
    "IN_GAME": 0,
    "SELECTED": 1,
    "NOT_SELECTED": 2
};

export default Friends;
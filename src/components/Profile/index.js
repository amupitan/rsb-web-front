import React, { Component } from 'react';

import user, { getLoggedInUserName } from '../../lib/user';
import { getGameHistory } from '../../lib/game';
import { Notifiable } from '../../mixins';

import { LoaderPage } from '../ui/Loader';
import FriendRequest from './FriendRequest';
import GameInvites from './GameInvites';
import GameHistory from './GameHistory';
import Heading from './Heading';
import FriendsList from './FriendsList';

import './style.css';

class Profile extends Notifiable(Component) {
    constructor(props) {
        super(props);

        this.componentDidMount = this.componentDidMount.bind(this);
        this.getUserInfo = this.getUserInfo.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.match.params.username === nextProps.match.params.username) return;
        this.getUserInfo(nextProps.match.params);
    }

    componentDidMount() {
        this.getUserInfo(this.props.match.params);
    }

    async getUserInfo({ username = getLoggedInUserName() }) {
        const userInfo = await user(username, { populate: 1 });
        if (userInfo.error) {
            // TODO: might want to handle error. It's already handled tho
            return console.error(userInfo);
        }

        const gameHistory = await getGameHistory(username);
        if (gameHistory.error) {
            return console.log(gameHistory);
        }

        this.setState({
            user: userInfo,
            friends: userInfo.friends,
            gameHistory: gameHistory.res
        });
    }

    render() {
        if (!this.state || this.state.user == null) {
            return <LoaderPage />
        } else if (this.state.user.friendRequests) { //If you can see friendRequesets, you are the current user.
            return (
                <div className="panel col-xs-10 col-xs-offset-1">
                    <Heading {...this.state.user} />
                    <div className="row">
                        <FriendRequest {...this.state.user} />
                        <GameInvites {...this.state.user} />
                    </div>
                    <div className="row">
                        <FriendsList {...this.state} />
                        <GameHistory {...this.state.gameHistory} />
                    </div>
                </div >
            )
        } else {
            return (
                <div className="panel col-xs-10 col-xs-offset-1">
                    <Heading {...this.state.user} />
                    <div className="row">
                        <FriendsList {...this.state} />
                        <GameHistory {...this.state.user.username} />
                    </div>
                </div >
            )
        }
    }
}

export default Profile;
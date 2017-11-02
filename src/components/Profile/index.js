import React, { Component } from 'react';

import user, { getLoggedInUserName } from '../../lib/user';
import { Notifiable } from '../../mixins';

import { LoaderPage } from '../ui/Loader';
import FriendRequest from './FriendRequest';
import GameInvites from './GameInvites';
import GameHistory from './GameHistory';
import Heading from './Heading';
import FriendsList from './FriendsList';
import AddOrRemove from './AddOrRemove';

import './style.css';

class Profile extends Notifiable(Component) {
    constructor(props) {
        super(props);

        this.state = {
            isCurrentUser: false
        }
        this.componentDidMount = this.componentDidMount.bind(this);
        this.getUserInfo = this.getUserInfo.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.match.params.username === nextProps.match.params.username) return;
        this.getUserInfo(nextProps.match.params);
        if (nextProps.match.params.username !== getLoggedInUserName()) {
            this.state = {
                isCurrentUser: false
            }
        }
    }

    componentDidMount() {
        this.getUserInfo(this.props.match.params);
    }

    async getUserInfo({ username = getLoggedInUserName() }) {

        var userInfo = await user({ username, populate: 1 });

        if (userInfo.username === getLoggedInUserName()) {
            this.setState({
                isCurrentUser: true
            });
        }
        if (userInfo.error) {
            // TODO: might want to handle error. It's already handled tho
            return console.error(userInfo);
        }

        this.setState({
            user: userInfo,
            friends: userInfo.friends || [],
        });
    }

    render() {
        if (!this.state || this.state.user == null) {
            return <LoaderPage />
        } else if (this.state.isCurrentUser) { //If you can see friendRequesets, you are the current user.
            return (
                <div className="panel col-xs-10 col-xs-offset-1">
                    <Heading {...this.state.user} />
                    <div className="row">
                        <FriendRequest {...this.state.user} />
                        <GameInvites {...this.state.user} />
                    </div>
                    <div className="row">
                        <FriendsList {...this.state} />
                        <GameHistory {...this.state.user.username} />
                    </div>
                </div >
            )
        } else {
            return (
                <div className="panel col-xs-10 col-xs-offset-1">
                    <div className="row">
                        <Heading {...this.state.user} />
                        <AddOrRemove
                            currentUsername={this.state.user.username}
                            friendsList={this.state.friends}
                        />
                    </div>
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
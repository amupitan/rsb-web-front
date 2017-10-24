import React, { Component } from 'react';

import user, { getName } from '../../lib/user';
import { Notifiable } from '../../mixins';

import { LoaderPage } from '../ui/Loader';
import FriendRequest from './FriendRequest';
import GameInvites from './GameInvites';
import GameHistory from './GameHistory';
import Heading from './Heading';
import FriendsList from './FriendsList';

import './style.css';
import defaultImg from '../../dummy/default.jpg';


class Profile extends Notifiable(Component) {
    constructor(props) {
        super(props);

        this.componentDidMount = this.componentDidMount.bind(this);
        this.getUserInfo = this.getUserInfo.bind(this);
        this.state = {
            user: null,
            friends: null
        }
    }

    static get name() {
        return getName();
    }

    componentWillReceiveProps(nextProps) {
        if (this.props === nextProps) return;
        this.getUserInfo(nextProps.match.params);
    }

    componentDidMount() {
        this.getUserInfo(this.props.match.params);
    }

    async getUsername() {
        return await getName();
    }

    async getUserInfo({ username }) {
        const u = await user(username, { populate: 1 });
        this.setState({
            user: u,
            friends: u.friends,
        });
    }

    render() {
        if (!this.state || this.state.user == null) {
            return <LoaderPage />
        } else if (this.state.user.friendRequests) { //If you can see friendRequesets, you are the current user.
            return (
                <div className="panel col-xs-10 col-xs-offset-1">
                    <Heading {...this.state.user} defaultImg={defaultImg} />
                    <div className="row">
                        <FriendRequest {...this.state.user} />
                        <GameInvites {...this.state.user} />
                    </div>
                    <div className="row">
                        <FriendsList {...this.state} defaultImg={defaultImg} />
                        <GameHistory {...this.state.user.username} />
                    </div>
                </div >
            )
        } else {
            return (
                <div className="panel col-xs-10 col-xs-offset-1">
                    <Heading {...this.state.user} defaultImg={defaultImg} />
                    <div className="row">
                        <FriendsList {...this.state} defaultImg={defaultImg} />
                        <GameHistory {...this.state.user.username} />
                    </div>
                </div >
            )
        }
    }
}

export default Profile;
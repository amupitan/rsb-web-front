import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import user, { getName } from '../../lib/user';
import { Notifiable } from '../../mixins';

import PopulateRequests from './PopulateRequests';
import RSBButton from '../ui/RSBButton';
import { LoaderPage } from '../ui/Loader';

import './style.css';
import defaultImg from '../../dummy/default.jpg';


class Profile extends Notifiable(Component) {
    constructor(props) {
        super(props);

        this.displayFriends = this.displayFriends.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.getUserInfo = this.getUserInfo.bind(this);
        this.state = {

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
        console.log("U", u);
        this.setState({
            user: u,
            friends: u.friends,
        });
    }

    getFriendRequest(u) {
        if (u && u.friendRequests && u.friendRequests.length > 0) {
            return (
                <div className="col-sm-6 panel panel-default">
                    <div className="panel-heading-rsb">
                        <h2>Friend Requests</h2>
                    </div>
                    <div className="scroll-info panel-body">
                        <PopulateRequests
                            info={u.friendRequests}
                        />
                    </div>
                </div>
            )
        }
        return (
            <div className="col-sm-6 panel panel-default">
                <div className="panel-heading-rsb">
                    <h2>Friend Requests</h2>
                </div>
                <div className="scroll-info panel-body">
                    <span>No friend requests</span>
                </div>
            </div>
        )
    }

    getGameInvites(g) {
        if (g && g.gameHistory && g.gameHistory.length > 0) {
            return (
                <div className="col-sm-6 panel panel-default">
                    <div className="panel-heading-rsb">
                        <h2>Game Invites</h2>
                    </div>
                    <div className="scroll-info panel-body">
                        <span>TODO: Display requests using PopulateRequests</span>
                    </div>
                </div>
            )
        }

        return (
            <div className="col-sm-6 panel panel-default">
                <div className="panel-heading-rsb">
                    <h2>Game Invites</h2>
                </div>
                <div className="scroll-info panel-body">
                    <span>No game invites</span>
                </div>
            </div>
        )
    }

    getFriends(f) {
        return (
            <div className="col-sm-6 panel panel-default">
                <div className="panel-heading-rsb">
                    <h2>Friends</h2>
                </div>
                <div className="scroll-info panel-body">
                    {this.displayFriends(f)}
                </div>
            </div>
        );
    }

    displayFriends(f) {
        let users = [];
        for (let i in f) {
            users.push(
                <div className="populate-requests row" key={i}>
                    <div className="col-sm-4 col-sm-pull">
                        <span className="">
                            <Link to={`/user/${f[i].username}`} >
                                <img src={f[i].ProfilePic || defaultImg} alt="Profile" className="profile-pic-xs"
                                />
                            </Link>
                        </span>
                    </div>
                    <div className="col-sm-4">
                        <span className="">
                            <Link to={`/user/${f[i].username}`}
                            >
                                {f[i].username}
                            </Link>
                        </span>
                    </div>
                    <div className="col-sm-4">
                        <RSBButton
                            glyphicons="glyphicon glyphicon-remove"
                            className="decline"
                            onClickFunction={() => {
                                console.log("Decline!");
                            }}
                        />
                    </div>
                </div >);
        };
        return users;
    }

    getGameHistory(g) {
        if (g && g.gameHistory && g.gameHistory.length > 0) {
            return (
                <div className="col-sm-6 panel panel-default">
                    <div className="panel-heading-rsb">
                        <h2>Game History</h2>
                    </div>
                    <div className="scroll-info panel-body">
                        <span>TODO: Display games</span>
                    </div>
                </div>
            )
        }

        return (
            <div className="col-sm-6 panel panel-default">
                <div className="panel-heading-rsb">
                    <h2>Game History</h2>
                </div>
                <div className="scroll-info panel-body">
                    <span>No game history</span>
                </div>
            </div>
        )
    }
    render() {
        if (!this.state || this.state.user == null) {
            return <LoaderPage />
        } else if (this.state.user.friendRequests) { //If you can see friendRequesets, you are the current user.
            return (
                <div className="panel col-xs-10 col-xs-offset-1">
                    <Heading {...this.state.user} defaultImg={defaultImg} />
                    <div className="row">
                        {this.getFriendRequest(this.state.user)}
                        {this.getGameInvites(this.state.user)}
                    </div>
                    <div className="row">
                        {this.getFriends(this.state.friends)}
                        {this.getGameHistory(this.state.user.username)}
                    </div>
                </div >
            )
        } else {
            return (
                <div className="panel col-xs-10 col-xs-offset-1">
                    <Heading {...this.state.user} defaultImg={defaultImg} />
                    <div className="row">
                        {this.getFriends(this.state.friends)}
                        {this.getGameHistory(this.state.user.username)}
                    </div>
                </div >
            )
        }
    }
}

const Heading = ({ profilePic, defaultImg, lastname, firstname, username }) => {
    return (
        <div className="row">
            <div className="col-sm-6 text-right">
                <img src={profilePic || defaultImg} alt="Profile" className="profile-pic" />
            </div>
            <div className="col-sm-6 text-left">
                <h4>{username}</h4>
                <span>Full Name: {firstname} {lastname}</span>
            </div>
        </div>
    )
}

export default Profile;

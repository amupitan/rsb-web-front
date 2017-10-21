import React, { Component } from 'react';
import { Link, BrowserRouter as Router } from 'react-router-dom';

import PopulateRequests from './PopulateRequests';

import user, { getUserFriends, getName } from '../../lib/user';

import RSBLabel from '../ui/RSBLabel';
import RSBButton from '../ui/RSBButton';
import { LoaderPage } from '../ui/Loader';

import defaultImg from '../../dummy/default.jpg';
import mockServer from '../../dummy';

import './style.css';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: mockServer("/user/p/1"),
        }
        this.displayFriends = this.displayFriends.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.getUserInfo = this.getUserInfo.bind(this);
    }

    static get path() {
        return getName();
    }

    componentDidMount() {
        this.getUserInfo();
    }


    async getUserInfo(m) {
        let username = (m || this.props.username);
        const u = await user(username);
        const friend = await getUserFriends(username);
        this.setState({
            user: u,
            friends: friend,
        })


    }


    getHeading(u) {
        console.log("Head: ", u);
        return (
            <div className="row">
                <div className="col-sm-6 text-right">
                    {/*TODO: Don't use this image foolz*/}
                    <img src={u.ProfilePic || defaultImg} alt="Profile" className="profile-pic" />
                </div>
                <div className="col-sm-6 text-left">
                    <h4>{u.username}</h4>
                    {/* <RSBLabel
                        name={this.state.data.numFriends}
                        className="friend-link"
                        onClickFunction={() => {
                            console.log("Clicked friends label")
                        }}
                    /> */}
                    <span>Full Name: {u.firstname} {u.lastname}</span>
                </div>
            </div>
        )
    }

    getFriendRequest(u) {
        if (u.friendRequests.length > 0) {
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

    getGameInvites() {
        return (
            <div className="col-sm-6 panel panel-default">
                <div className="panel-heading-rsb">
                    <h2>Games Invites</h2>
                </div>
                <div className="scroll-info panel-body">
                    <PopulateRequests
                        info={this.state.data.result[0].GameInvites}
                    />
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
        f.forEach((el, i) => {
            users.push(
                <div className="populate-requests row" key={i}>
                    <div className="col-sm-4 col-sm-pull">

                        {/*This sets the url to the user, but it doesn't refresh the page*/}
                        <Router>
                            <span className="">
                                <Link to={`/user/${el.username}`} >
                                    <img src={el.ProfilePic || defaultImg} alt="Profile" className="profile-pic-xs"
                                        onClick={() => {
                                            this.getUserInfo(el.username);
                                        }} />
                                </Link>
                            </span>
                        </Router>
                    </div>
                    <div className="col-sm-4">
                        <Router>
                            <span className="">
                                <Link to={`/user/${el.username}`}
                                    onClick={() => {
                                        this.getUserInfo(el.username);
                                    }}>
                                    {el.username}
                                </Link>
                            </span>
                        </Router>
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
        });
        return users;
    }

    getGameHistory(g) {
        if (g.gameHistory && g.gameHistory.length > 0) {
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
        if (this.state.user == null) {
            return <LoaderPage />
        } else if (this.state.user.city) { //If there's a city, it's the current user TODO: Use a different reference
            return (
                <div className="panel col-xs-10 col-xs-offset-1">
                    {/* <h2>This is you</h2> */}
                    {this.getHeading(this.state.user)}
                    <div className="row">
                        {this.getFriendRequest(this.state.user)}
                        {this.getGameInvites()}
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
                    {/* <h2>You're stalking someone</h2> */}
                    {this.getHeading(this.state.user)}
                    <div className="row">
                        {this.getFriends(this.state.friends)}
                        {this.getGameHistory(this.state.user.username)}
                    </div>
                </div >
            )
        }
    }
}

export default Profile;

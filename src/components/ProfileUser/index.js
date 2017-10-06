import React, { Component } from 'react';
import RSBLabel from '../ui/RSBLabel';
import mockServer from '../../dummy';
import DisplayFriends from './DisplayFriends';
import PopulateRequests from './PopulateRequests';

import './style.css';

class ProfileUser extends Component {
    constructor(props) {
        super(props);
        this.render = this.render.bind(this);
    }

    data = mockServer("/user/p/1");

    render() {
        let numFriends = "Friends " + this.data.result[0].Friends.length;

        return (
            <div className="panel panel-default col-xs-8 col-xs-offset-2">
                <div>
                    <div className="row">
                        <div className="col-sm-6 text-right">
                            <img src={this.data.result[0].ProfilePic} alt="Profile" className="profile-pic" />
                        </div>
                        <div className="col-sm-6 text-left">
                            <h4>{this.data.result[0].Username}</h4>
                            <RSBLabel
                                name={numFriends}
                                className="friend-link"
                                onClickFunction={() => {
                                    console.log("Clicked friends label")
                                }}
                            />
                            <span>Full Name: {this.data.result[0].Firstname} {this.data.result[0].Lastname}</span>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-6 panel panel-default">
                        <div className="panel-heading">
                            <h2>Friend Requests</h2>
                        </div>
                        <div className="scroll-info panel-body">
                            <PopulateRequests
                                info={this.data.result[0].FriendRequests}
                            />
                        </div>
                    </div>
                    <div className="col-sm-6 panel panel-default">
                        <div className="panel-heading">
                            <h2>Games Invites</h2>
                        </div>
                        <div className="scroll-info panel-body">
                            <RSBLabel
                                name="Game History"
                                className="game-history-link"
                                onClickFunction={() => {
                                    console.log("Clicked Game History label")
                                }}
                            />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-6 panel panel-default">
                        <div className="panel-heading">
                            <h2>Friends</h2>
                        </div>
                        <div className="scroll-info panel-body">
                            <DisplayFriends
                                friends={this.data.result[0].Friends}
                            />
                        </div>
                    </div>
                    <div className="col-sm-6 panel panel-default">
                        <div className="panel-heading">
                            <h2>Games</h2>
                        </div>
                        <div className="scroll-info panel-body">
                            <RSBLabel
                                name="Game History"
                                className="game-history-link"
                                onClickFunction={() => {
                                    console.log("Clicked Game History label")
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ProfileUser;

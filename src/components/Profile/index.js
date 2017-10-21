import React from 'react';
import RSBLabel from '../ui/RSBLabel';
import mockServer from '../../dummy';
import DisplayFriends from './DisplayFriends';
import PopulateRequests from './PopulateRequests';

import './style.css';

function Profile() {
    let data = mockServer("/user/p/1");
    let numFriends = "Friends " + data.result[0].Friends.length;

    function heading() {
        return (
            <div className="row">
                <div className="col-sm-6 text-right">
                    <img src={data.result[0].ProfilePic} alt="Profile" className="profile-pic" />
                </div>
                <div className="col-sm-6 text-left">
                    <h4>{data.result[0].Username}</h4>
                    <RSBLabel
                        name={numFriends}
                        className="friend-link"
                        onClickFunction={() => {
                            console.log("Clicked friends label")
                        }}
                    />
                    <span>Full Name: {data.result[0].Firstname} {data.result[0].Lastname}</span>
                </div>
            </div>
        )
    }

    function FriendRequest() {
        return (
            <div className="col-sm-6 panel panel-default">
                <div className="panel-heading-rsb">
                    <h2>Friend Requests</h2>
                </div>
                <div className="scroll-info panel-body">
                    <PopulateRequests
                        info={data.result[0].FriendRequests}
                    />
                </div>
            </div>
        )
    }

    function GameInvites() {
        return (
            <div className="col-sm-6 panel panel-default">
                <div className="panel-heading-rsb">
                    <h2>Games Invites</h2>
                </div>
                <div className="scroll-info panel-body">
                    <PopulateRequests
                        info={data.result[0].GameInvites}
                    />
                </div>
            </div>
        )
    }

    function Friends() {
        return (
            <div className="col-sm-6 panel panel-default">
                <div className="panel-heading-rsb">
                    <h2>Friends</h2>
                </div>
                <div className="scroll-info panel-body">
                    <DisplayFriends
                        friends={data.result[0].Friends}
                    />
                </div>
            </div>
        );
    }

    function GameHistory() {
        return (
            <div className="col-sm-6 panel panel-default">
                <div className="panel-heading-rsb">
                    <h2>Game History</h2>
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
        )
    }
    return (
        <div className="panel col-xs-10 col-xs-offset-1">
            {heading()}
            <div className="row">
                {FriendRequest()}
                {GameInvites()}
            </div>
            <div className="row">
                {Friends()}
                {GameHistory()}
            </div>
        </div >
    )
}

export default Profile;

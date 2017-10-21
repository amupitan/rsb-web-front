import React, {Component} from 'react';
import RSBLabel from '../ui/RSBLabel';
import mockServer from '../../dummy';
import DisplayFriends from './DisplayFriends';
import PopulateRequests from './PopulateRequests';

import './style.css';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: mockServer("/user/p/1"),
        }
    
    }

    componentWillMount() {
        // this.getUser();
    }

    


    heading() {
        return (
            <div className="row">
                <div className="col-sm-6 text-right">
                    <img src={this.state.data.result[0].ProfilePic} alt="Profile" className="profile-pic" />
                </div>
                <div className="col-sm-6 text-left">
                    <h4>{this.state.data.result[0].Username}</h4>
                    {/* <RSBLabel
                        name={this.state.data.numFriends}
                        className="friend-link"
                        onClickFunction={() => {
                            console.log("Clicked friends label")
                        }}
                    /> */}
                    <span>Full Name: {this.state.data.result[0].Firstname} {this.state.data.result[0].Lastname}</span>
                </div>
            </div>
        )
    }

    FriendRequest() {
        return (
            <div className="col-sm-6 panel panel-default">
                <div className="panel-heading-rsb">
                    <h2>Friend Requests</h2>
                </div>
                <div className="scroll-info panel-body">
                    <PopulateRequests
                        info={this.state.data.result[0].FriendRequests}
                    />
                </div>
            </div>
        )
    }

    GameInvites() {
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

    Friends() {
        return (
            <div className="col-sm-6 panel panel-default">
                <div className="panel-heading-rsb">
                    <h2>Friends</h2>
                </div>
                <div className="scroll-info panel-body">
                    <DisplayFriends
                        friends={this.state.data.result[0].Friends}
                    />
                </div>
            </div>
        );
    }

    GameHistory() {
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
    render() {
        return (
            <div className="panel col-xs-10 col-xs-offset-1">
                {this.heading()}
                <div className="row">
                    {this.FriendRequest()}
                    {this.GameInvites()}
                </div>
                <div className="row">
                    {this.Friends()}
                    {this.GameHistory()}
                </div>
            </div >
        )
    }
}

export default Profile;

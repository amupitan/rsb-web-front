import React, { Component } from 'react';
import RSBLabel from '../ui/RSBLabel';
import RSBButton from '../ui/RSBButton';

import './style.css';

class ProfileUser extends Component {
    constructor(props) {
        super(props);
        this.render = this.render.bind(this);
    }

    render() { 
        return (
            <div>
                <div className="modal-header">
                    <RSBButton
                        text="X"
                        className="close"
                        onClickFunction={this.props.onCloseFunction}
                    />
                    <h4 className="modal-title">Profile</h4>
                </div>
                <div className="modal-body">
                    <div className="container row">
                        <div className="col-sm-2" />
                        <div className="col-sm-8 profile-info">
                            <div className="container row">
                                <div className="col-sm-4 profile-pic">
                                    <h3>User picture</h3>
                                </div>
                                <div className="col-sm-8 user-info">
                                    <h4>User's Name</h4>
                                    <RSBLabel
                                        name="Friends"
                                        className="friend-link"
                                        onClickFunction={() => {
                                            console.log("Clicked friends label")
                                        }}
                                    />
                                    <span>Location: User's location</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-2" />
                    </div>
                    <div className="container row">
                        <div className="col-sm-6">
                            <h2>Friends</h2>
                            <div className="top-col">
                                <div className="sub-col">
                                    <p>Friend Request</p>
                                </div>
                                <div className="sub-col">
                                    <p>Top Friends</p>
                                </div>
                                <div className="sub-col">
                                    <p>Recently Added</p>
                                </div>
                                <div className="sub-col">
                                    <p>Rest of the friends</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6 ">
                            <h2>Games</h2>
                            <div className="top-col">
                                <div className="sub-col">
                                    <p>Top sports, and rating of the sport?</p>
                                </div>
                                <div className="sub-col">
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
                </div>
            </div>
        )
    }
}

export default ProfileUser;

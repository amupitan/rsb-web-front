import React, { Component } from 'react';
import RSBLabel from '../ui/RSBLabel';
import mockServer from '../../dummy';
import DisplayFriends from './DisplayNames';

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
            <div className="panel panel-default col-xs-6 col-xs-offset-3">
                <div>
                    <div className=" text-center">
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
                <div>
                    <div className="col-sm-6 panel panel-default">
                        <h2>Friends</h2>
                        <div className="scroll-info panel-body">
                            <DisplayFriends
                                friends={this.data.result[0].Friends}
                            />
                            {/*Can add more things like "Top friends", "Recnetly Added" later*/}
                        </div>
                    </div>
                    <div className="col-sm-6 panel panel-default">
                        <h2>Games</h2>
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

import React, { Component } from 'react';
import RSBLabel from '../ui/RSBLabel';
import RSBButton from '../ui/RSBButton';
import mockServer from '../../dummy';

import './style.css';

class CurrentGame extends Component {
    constructor(props) {
        super(props);
        //For now I have dummy data in here to test how it looks
        this.state = {
            doesGameExist: true, //TODO: this could come as a prop

            //TODO: rest of these should move to componentWillUpdate
            opponentTeamName: "Winenrs",
            userTeamName: "Losers",
            gameLocation: "2710 East Street, Ames, Iowa",
            gameTime: "4:25 PM CT",
            userTeamMembers: ['Walter', 'Victor', 'Mich'],
            opponentTeamMembers: ['Lucas', 'Karlee']
        }

        //ES6 React.Component doesn't auto bind methods to itself. You need to bind them yourself
        this.render = this.render.bind(this);
        this.handleLeaveGame = this.handleLeaveGame.bind(this);
        this.handleProfileClick = this.handleProfileClick.bind(this);
    }

    

    handleLeaveGame() {
        console.log("User wants to leave the game");
    }

    handleProfileClick(userInfo) {
        console.log(userInfo.memberName + " should be visible")
    }

    render() {
        let data = mockServer("/game/g/123");
        console.log("Data: ", data);

        //Array that aligns with the sports number the backend sends back
        const sports = ["soccer", "basketball", "volleyball", "baseball", "frisbee", "discgolf"];
        
        const opponentTeamName = this.state.opponentTeamName;
        const userTeamName = this.state.userTeamName;

        let renderPage;

        if (!this.state.doesGameExist) {
            renderPage =
                <div>
                    <div className="row">
                        <div className="rsb-current-game--title">Current Game</div>
                    </div>
                    <div className="panel panel-default col-md-6 col-md-offset-3">
                        <div className="panel-body">
                            <div className="text-center text-danger">You are not currently in a game!</div>
                            <div className="text-center text-danger">(Use the quick menu in the bottom left corner to start or join a game.)</div>
                        </div>
                    </div>

                </div>
        }
        //Render when a game exists
        else {
            renderPage =
                <div>
                    <div className="row">
                        <div className="rsb-current-game--title">Current Game</div>
                    </div>
                    <div className="rsb-current-game--team-names text-center">
                        <span className="rsb-current-game--team-label">{userTeamName}</span>
                        <span className="rsb-current-game--vs"> Vs. </span>
                        <span className="rsb-current-game--opponent-label">{opponentTeamName}</span>
                    </div>
                    <div className="panel-group col-xs-6 col-xs-offset-3">
                        <div className="panel panel-default">
                            <div className="panel-heading text-center">{userTeamName}</div>
                            <div className="panel-body">
                                <ul className="list-group">
                                    {this.state.userTeamMembers.map((memberName, i) => {
                                        return <li className="list-group-item" key={i}>
                                            <RSBLabel
                                                name={memberName}
                                                className="info"
                                                onClickFunction={() => {
                                                    this.handleProfileClick({ memberName });
                                                }}
                                            /></li>;
                                    })}
                                </ul>
                            </div>
                        </div>
                        <div className="panel panel-default">
                            <div className="panel-heading text-center">{opponentTeamName}</div>
                            <div className="panel-body">
                                <ul className="list-group">
                                    {this.state.opponentTeamMembers.map((memberName, i) => {
                                        return <li className="list-group-item" key={i}>
                                            <RSBLabel
                                                name={memberName}
                                                className="info"
                                                onClickFunction={() => {
                                                    this.handleProfileClick({ memberName });
                                                }}
                                            /></li>;
                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-6 col-xs-offset-3 text-center">
                        <p >Location: {this.state.gameLocation}</p>
                        <p >Time: {this.state.gameTime}</p>
                    </div>
                    <RSBButton
                        text="Leave Game"
                        buttonType="danger"
                        onClickFunction={this.handleLeaveGame}
                        className="rsb-current-game--leave-btn"
                    />
                </div>
        }

        return renderPage;
    }
}

export default CurrentGame;

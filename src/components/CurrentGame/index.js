import React, { Component } from 'react';
import RSBButton from '../ui/RSBButton';
import mockServer from '../../dummy';

import './style.css';

class CurrentGame extends Component {
    constructor(props) {
        super(props);
        //For now I have dummy data in here to test how it looks
        let data = mockServer("/game/g/123");
        this.state = {
            doesGameExist: true, //TODO: this could come as a prop
            gameData: data,

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

    doesGameExist() {
        return (this.state.gameData.result ? true : false);
    }

    heading() {
        return (
            <div className="row panel-header">
                <div className="text-center">
                    <h4>{this.state.gameData.result[0].Name}</h4>
                    <span>Join Code: "{this.state.gameData.result[0].JoinCode}"</span>
                </div>
            </div>
        )
    }

    generate(){
        let tempUsers = [];
        this.setState.gameData.result[0].Members.forEach((mem,i)=>{
            tempUsers+= (
                <div>
                    Hello, {mem}
                    </div>
            )
        })

        return tempUsers;
    }

    getUsers() {
        return (
            <div className="col-sm-6 panel panel-default">
                <div className="panel-heading-rsb">
                    <h2>Current Players</h2>
                </div>
                <div className="scroll-info panel-body">

                </div>
            </div>
        )
    }

    generalInfo() {
        //Array that aligns with the sports number the backend sends back
        const sports = ["soccer", "basketball", "volleyball", "baseball", "frisbee", "discgolf"];
        var options = {  
            weekday: "long", year: "numeric", month: "short",  
            day: "numeric", hour: "2-digit", minute: "2-digit"  
        }; 

        const gameInfo = this.state.gameData.result[0];
        return (
            <div className="col-sm-6 panel panel-default">
                <div className="panel-heading-rsb">
                    <h2>General Game Info</h2>
                </div>
                <div className="scroll-info panel-body">
                    <span><b>Host</b>: {gameInfo.Host}</span><br/>
                    <span><b>StartTime</b>: {(gameInfo.StartTime).toLocaleTimeString("en-us", options)}</span><br/>
                    <span><b>Location</b>: Lat: {gameInfo.Location["Lat"]} Lng: {gameInfo.Location["Lng"]} </span><br/>
                    <span><b>Sport</b>: {sports[gameInfo.Sport]}</span><br/>
                    <span><b>Age Range</b>:Min: {gameInfo.AgeRange[0]}  Max: {gameInfo.AgeRange[1]}</span><br/>
                </div>
            </div>
        )
    }

    render() {
        console.log("Data: ", this.state.gameData);

        let renderPage;

        if (this.doesGameExist() === false) {
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
                <div className="panel col-xs-10 col-xs-offset-1">
                    {this.heading()}
                    <div className="row">
                        {this.getUsers()}
                        {this.generalInfo()}
                    </div>
                    <RSBButton
                        text="Exit Game"
                        buttonType= "danger"
                        onClickFunction={()=>{
                            console.log("Leave game");
                        }}
                    />
                    {/*Leave game button*/}
                </div>
        }

        return renderPage;
    }
}

export default CurrentGame;

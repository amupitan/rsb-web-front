import React from 'react';
import RSBButton from '../ui/RSBButton';
import RSBLabel from '../ui/RSBLabel';
import mockServer from '../../dummy';

import './style.css';

function CurrentGame() {
    const gameData = mockServer("/game/g/123");
    
    function doesGameExist() {
        return (gameData.result ? true : false);
    }

    function heading() {
        return (
            <div className="row panel-header">
                <div className="text-center rsb-current-game--title">
                    <h1>{gameData.result[0].name}</h1>
                    <span>Join Code: "{gameData.result[0].joincode}"</span>
                </div>
            </div>
        )
    }

    function populateUsers() {
        let tempUsers = [];
        gameData.result[0].members.forEach((mem, i) => {
            tempUsers.push(
                <div className="row" key={i}>
                    <div className="col-sm-4 col-sm-pull">
                        <img src={mem.profilepic} alt="Profile" className="profile-pic-xs" />
                    </div>
                    <div className="col-sm-4">
                        <RSBLabel
                            name={mem.username}
                            onClickFunction={() => {
                                console.log("Pressed ", mem.firstname, mem.lastname);
                            }}
                        />
                    </div>
                </div>
            )
        })
        return tempUsers;
    }

    function getCurrentPlayers() {
        return (
            <div className="col-sm-6 panel panel-default">
                <div className="panel-heading-rsb">
                    <h2>Current Players</h2>
                </div>
                <div className="scroll-info panel-body">
                    {populateUsers()}
                </div>
            </div>
        );
    }

    function generalInfo() {
        //Array that aligns with the sports number the backend sends back
        const sports = ["soccer", "basketball", "volleyball", "baseball", "frisbee", "discgolf"];
        const gameInfo = gameData.result[0];

        var options = {
            weekday: "long", year: "numeric", month: "short",
            day: "numeric", hour: "2-digit", minute: "2-digit"
        };

        return (
            <div className="col-sm-6 panel panel-default">
                <div className="panel-heading-rsb">
                    <h2>General Game Info</h2>
                </div>
                <div className="scroll-info panel-body">
                    <span><b>Host</b>: {gameInfo.host}</span><br />
                    <span><b>StartTime</b>: {(gameInfo.starttime).toLocaleTimeString("en-us", options)}</span><br />
                    <span><b>Location</b>: Lat: {gameInfo.location["Lat"]} Lng: {gameInfo.location["Lng"]} </span><br />
                    <span><b>Sport</b>: {sports[gameInfo.sport]}</span><br />
                    <span><b>Age Range</b>:Min: {gameInfo.agerange[0]}  Max: {gameInfo.agerange[1]}</span><br />
                </div>
            </div>
        )
    }

    const gameExist = (
        <div className="panel col-xs-10 col-xs-offset-1">
            {heading()}
            <div className="row">
                {getCurrentPlayers()}
                {generalInfo()}
            </div>
            <RSBButton
                text="Exit Game"
                buttonType="danger"
                onClickFunction={() => {
                    console.log("User wants to leave the game");
                }}
            />
        </div>
    );

    const gameNoExist = (
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
    )
    return (doesGameExist() ? gameExist : gameNoExist);
}

export default CurrentGame;

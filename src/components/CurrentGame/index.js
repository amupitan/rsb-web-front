import React, { Component } from 'react';

import Game, { sports } from '../../lib/game';
import { DateUtils } from '../../lib/utils';

import Loader from '../ui/Loader';
import RSBButton from '../ui/RSBButton';
import RSBLabel from '../ui/RSBLabel';

import defaultImg from '../../dummy/default.jpg';//'.././default.jpg';
import './style.css';

class CurrentGame extends Component {
    constructor(props) {
        super(props);

        this.game = null;
        this.state = {
            hasGame: false,
        }
        this.getCurrentGame = this.getCurrentGame.bind(this);
    }

    heading() {
        return (
            <div className="row panel-header">
                <div className="text-center rsb-current-game--title">
                    <h1>{this.game.name}</h1>
                    <span>Join Code: "{this.game.joincode}"</span>
                </div>
            </div>
        )
    }

    renderUsers() {
        const mem = {
            firstname: 'Walter',
            lastname: 'Seymour',
            username: 'wseymour',
            profilepic: defaultImg,
        };
        const members = this.game.members.map((player, i) => {
            return <UserLabel key={i} {...mem} />
        });
        return members;
    }

    renderGameInfo() {
        const { host, startTime, location, sport, agerange } = this.game;

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
                    <span><b>Host</b>: {host}</span><br />
                    <span><b>StartTime</b>: {DateUtils.getTime(startTime)}</span><br />
                    <span><b>Location</b>: Latitude: {location.lat} Longitude: {location.lng} </span><br />
                    <span><b>Sport</b>: {sports[sport]}</span><br />
                    <span><b>Age Range</b>:Min: {agerange[0]}  Max: {agerange[1]}</span><br />
                </div>
            </div>
        )
    }

    getCurrentPlayers() {
        return (
            <div className="col-sm-6 panel panel-default">
                <div className="panel-heading-rsb">
                    <h2>Current Players</h2>
                </div>
                <div className="scroll-info panel-body">
                    {this.renderUsers()}
                </div>
            </div>
        );
    }

    async getCurrentGame() {
        const game = await Game();

        // We don't check for an error here because we're th ones who 
        // create the id so we're expecting it to be almost impossible
        // for the server to be unable to let us join the game
        if (game) {
            this.game = game;
            this.setState({
                hasGame: true,
            });
        }//else something really bad happened
    }

    componentDidMount() {
        this.getCurrentGame();
    }

    render() {
        if (!this.state.hasGame) {
            return <div style={{ width: '150px', height: '150px', marginTop: '300px', marginLeft: '650px' }}><Loader /></div>;
        }

        return (
            <div className="panel col-xs-10 col-xs-offset-1">
                {this.heading()}
                <div className="row">
                    {this.getCurrentPlayers()}
                    {this.renderGameInfo()}
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
    }
}

const UserLabel = ({ profilepic, firstname, lastname, username }) => {
    return (
        <div className="row" >
            <div className="col-sm-4 col-sm-pull">
                <img src={profilepic} alt="Profile" className="profile-pic-xs" />
            </div>
            <div className="col-sm-4">
                <RSBLabel
                    name={firstname}
                    onClickFunction={() => {
                        console.log("Pressed ", firstname, lastname);
                    }}
                />
            </div>
        </div>
    );
};

export default CurrentGame;

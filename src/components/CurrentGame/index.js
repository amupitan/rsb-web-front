import React, { Component } from 'react';

import Game, { sports } from '../../lib/game';
import { DateUtils } from '../../lib/utils';

import { LoaderPage } from '../ui/Loader';
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
        const members = this.game.members && this.game.members.map((player, i) => {
            return <UserLabel key={i} {...mem} />
        });
        return members;
    }

    renderGameInfo() {
        const { host, startTime, location, sport, agerange } = this.game;

        return (
            <div className="col-sm-6 panel panel-default">
                <div className="panel-heading-rsb">
                    <h2>General Game Info</h2>
                </div>
                <div className="scroll-info panel-body">
                    <span><b>Host</b>: {host}</span><br />
                    <span><b>StartTime</b>: {DateUtils.getReadbaleTime(startTime)}</span><br />
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
        try {
            const game = await Game();
            if (game) {
                this.game = game;
                this.setState({
                    hasGame: true,
                });
            }//else something really bad happened. TODO: handle
        } catch (err) {
            //TODO: handle error
            console.error(err);
        }
    }

    componentDidMount() {
        this.getCurrentGame();
    }

    render() {
        if (!this.state.hasGame) {
            return <LoaderPage />;
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

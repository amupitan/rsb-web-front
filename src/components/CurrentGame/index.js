import React, { Component } from 'react';
import { Link } from "react-router-dom";

import Game, { sports, leaveGame } from '../../lib/game';
import { DateUtils } from '../../lib/utils';
import { Notifiable } from "../../mixins";

import { LoaderPage } from '../ui/Loader';
import RSBButton from '../ui/RSBButton';
import RSBLabel from '../ui/RSBLabel';
import Avatar from '../ui/Avatar';

import './style.css';

class CurrentGame extends Notifiable(Component) {
    constructor(props) {
        super(props);

        this.game = null;
        this.state = {
            hasGame: false,
        }
        this.getCurrentGame = this.getCurrentGame.bind(this);
        this.handleLeaveGame = this.handleLeaveGame.bind(this);
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
        const members = this.game.members && this.game.members.map((player, i) => {
            return <UserLabel key={i} {...player} />
        });
        return members;
    }

    // TODO: reuse game-info from maps
    renderGameInfo() {
        const { host, startTime, location, sport, agerange } = this.game;
        const { firstname, lastname, username } = host;
        return (
            <div className="col-sm-6 panel panel-default">
                <div className="panel-heading-rsb">
                    <h2>General Game Info</h2>
                </div>
                <div className="scroll-info panel-body">
                    <span><b>Host</b>: <Link to={`/user/${username}`}>{firstname} {lastname}</Link></span><br />
                    <span><b>StartTime</b>: {DateUtils.getReadableTime(startTime)}</span><br />
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
        if (game) {
            this.game = game;
            this.setState({
                hasGame: true,
            });
        }//else something really bad happened. TODO: handle
    }

    handleLeaveGame() {
        leaveGame(this.game.id);
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
                    onClickFunction={this.handleLeaveGame}
                />
            </div>
        );
    }
}

const UserLabel = ({ avatar, firstname, lastname, username }) => {
    console.log(avatar);
    return (
        <div className="row" >
            <Link to={`/user/${username}`} >
                <div className="col-sm-4 col-sm-pull">
                    <Avatar avatar={avatar} alt='profile-pic' className='profile-pic-xs' />
                </div>
                <div className="col-sm-4">
                    <RSBLabel
                        name={`${firstname || ''} ${lastname || ''}`}
                        onClickFunction={() => {
                            console.log("Pressed ", firstname, lastname);
                        }}
                    />
                </div>
            </Link>
        </div>
    );
};

export default CurrentGame;

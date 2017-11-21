import React, { Component } from 'react';
import { Link } from "react-router-dom";

import Game, { sports, leaveGame } from '../../lib/game';
import { toFriends } from '../../lib/user';
import { getAddress } from '../../lib/map';
import { DateUtils } from '../../lib/utils';
import { Notifiable } from "../../mixins";

import Loader, { LoaderPage } from '../ui/Loader';
import RSBButton from '../ui/RSBButton';
import RSBLabel from '../ui/RSBLabel';
import Avatar from '../ui/Avatar';

import hoops from '../../assets/hoop.gif';

import './style.css';

class CurrentGame extends Notifiable(Component) {
    constructor(props) {
        super(props);

        this.game = null;
        this.state = {
            gameLoaded: false,
            errorMessage: null,
        }

        this.getStreetAddress = this.getStreetAddress.bind(this);
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
        const { host, startTime, sport, agerange } = this.game;
        const { firstname, lastname, username } = host;

        const renderLocation = () => {
            const address = this.state.locationLoaded ? this.state.locationLoaded :
                <Loader width={30} height={30} thickness={6} />;

            return <span><b>Location</b>: {address} <br /></span>
        };


        return (
            <div className="col-sm-6 panel panel-default">
                <div className="panel-heading-rsb">
                    <h2>General Game Info</h2>
                </div>
                <div className="scroll-info panel-body">
                    <span><b>Host</b>: <Link to={`/user/${username}`}>{firstname} {lastname}</Link></span><br />
                    <span><b>StartTime</b>: {DateUtils.getReadableTime(startTime)}</span><br />
                    {renderLocation()}
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
        if (game.error) {
            this.setState({
                errorMessage: game.error,
            });
            return;
        }

        this.game = game;
        this.setState({
            gameLoaded: true,
            errorMessage: null,
        });

        this.getStreetAddress();
    }

    getStreetAddress() {
        const { lat, lng } = this.game.location;
        getAddress({ lat, lng }).then((res) => {

            if (res.error) {
                this.setState({ errorMessage: res.error });
                return;
            }

            console.log(res);
            this.setState({ locationLoaded: res.address });
        });
    }

    handleLeaveGame() {
        leaveGame(this.game.id);
    }


    componentDidMount() {
        this.getCurrentGame();
    }

    render() {
        if (this.state.errorMessage) {
            return <ErrorBox message={this.state.errorMessage} />;
        }
        if (!this.state.gameLoaded) {
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
                    text="Invite Friends"
                    buttonType="info"
                    onClickFunction={toFriends}
                />
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

const ErrorBox = ({ message }) => (
    <div className='rsb-current-game-error-box'>
        <img src={hoops} alt='stick man throwing hoops' width={350} />
        <p className='rsb-current-game-error-message'>{message}</p>
        <Link to='/join'>
            <button className='rsb-current-game-error-button'><span>Join Game </span></button>
        </Link>
    </div>
);

export default CurrentGame;

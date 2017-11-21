import React, { Component } from 'react';
import { Link } from "react-router-dom";

import Game, { leaveGame } from '../../lib/game';
import { toFriends } from '../../lib/user';
import { getAddress, getWeather, getDistanceBetweenTwoPoints as getDistance, getCurrentLocation } from '../../lib/map';

import { Notifiable } from "../../mixins";

import { LoaderPage } from '../ui/Loader';
import RSBButton from '../ui/RSBButton';
import Avatar from '../ui/Avatar';

import { GameInfoLeft, GameInfoCenter, GameInfoRight } from './GameInfo';
import { ErrorMessage, ErrorPage } from './Errors';


import './style.css';

class CurrentGame extends Notifiable(Component) {
    constructor(props) {
        super(props);

        this.game = null;
        this.distance = null;
        this.state = {
            gameLoaded: false,
            errorMessage: null,
            errorFatal: null,
        }

        this.getWeather = this.getWeather.bind(this);
        this.getStreetAddress = this.getStreetAddress.bind(this);
        this.getCurrentGame = this.getCurrentGame.bind(this);
    }

    async getCurrentGame() {
        const game = await Game();
        if (game.error) {
            this.setState({
                errorFatal: game.error,
            });
            return;
        }

        this.game = game;
        const myLocation = await getCurrentLocation();
        this.distance = getDistance({ origin: myLocation, dest: game.location });

        this.setState({
            gameLoaded: true,
            errorFatal: null,
            errorMessage: null,
        });

        this.getStreetAddress();

        this.getWeather();
    }

    getStreetAddress() {
        const { lat, lng } = this.game.location;
        getAddress({ lat, lng }).then((res) => {

            if (res.error) {
                this.setState({ errorMessage: res.error });
                return;
            }

            this.setState({ locationLoaded: res.address });
        });
    }

    getWeather() {
        const { lat, lng } = this.game.location;
        getWeather({ lat, lng }).then((res) => {
            if (res.error) {
                this.setState({ errorMessage: res.error });
                return;
            }

            this.setState({ weather: res });
        });
    }

    componentDidMount() {
        this.getCurrentGame();
    }

    renderMembers({ members = [] }) {

        let numMembers = members.length;
        const rows = [];

        while (numMembers > 0) {
            let i = 0;
            const labels = [], rowCount = (numMembers - 1) / 4;

            // add row of 4 user cards
            while (i < 4 && numMembers > 0) {
                labels[i++] = <UserCard {...members[--numMembers]} key={numMembers} />;
            }

            // add row
            rows[rowCount] = (
                <div className="rsb-game-member-row" key={rowCount}>
                    <div className="row">
                        {labels}
                    </div>
                </div>
            );
        }

        return rows;
    }

    render() {
        if (this.state.errorFatal) {
            return <ErrorPage message={this.state.errorFatal} />;
        }
        if (!this.state.gameLoaded) {
            return <LoaderPage />;
        }

        const { name, host, startTime, sport, agerange, duration, joincode, members } = this.game;

        return (
            <div className="container-fluid rsb-game">
                <div className="rsb-game">
                    <div className="rsb-game-top row">
                        <GameInfoLeft weather={this.state.weather} distance={this.distance} />
                        <GameInfoCenter {...{ host, name, sport, address: this.state.locationLoaded, joincode }} />
                        <GameInfoRight minAge={agerange[0]} maxAge={agerange[1]} {...{ startTime, duration }} />
                    </div>
                    <ErrorMessage message={this.state.errorMessage} />
                    <div className="rsb-game-members">
                        <h2 className="text-center">Game members</h2>
                        {(members &&
                            <div className="rsb-game-members-list">
                                {this.renderMembers({ members })}
                            </div>) ||
                            <p className='lead text-center'>There are no other members in this game </p>
                        }
                    </div>
                    <Footer />
                </div>

            </div>
        );
    }
}

const UserCard = ({ avatar, firstname, lastname, username }) => (
    <Link to={`/user/${username}`}>
        <div className="col-sm-3 rsb-game-member-card">
            <div className="rsb-game-member-avatar text-center">
                <Avatar avatar={avatar} alt='member-profile-pic' className='rsb-game-member-photo' />
                <p className="text-center lead">{firstname} {lastname}</p>
            </div>
        </div>
    </Link>
);

const Footer = () => (
    <div>
        <div className="rsb-game-leave row text-center">
            <div className="col-sm-6">
                <RSBButton text="Invite Friends" buttonType="info" onClickFunction={toFriends} />
            </div>
            <div className="col-sm-6">
                <RSBButton text="Exit Game" buttonType="danger" onClickFunction={leaveGame} />
            </div>
        </div>
        <div className="rsb-game-bottom row">
        </div>
    </div>
);

export default CurrentGame;

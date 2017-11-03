import React, { Component } from 'react';

import { getLoggedInUserName, getGameHistory } from '../../lib/user';
import { Notifiable } from "../../mixins";

import displayGames from './displayGames';
import { LoaderPage } from '../ui/Loader';

import './style.css';

class GameHistory extends Notifiable(Component) {

    constructor(props) {
        super(props);
        this.state = {
            friendSearch: '',
            userFriends: [],
        }

        this.render = this.render.bind(this);
        this.onchange = this.onchange.bind(this);
    }

    componentDidMount() {
        this.getGameHistory();
    }

    async getGameHistory() {
        const username = getLoggedInUserName();
        const games = await getGameHistory(username);
        if (!games.error) {
            this.setState({
                games: games
            });
        }
    }

    onchange(num) {
        this.setGameRating(num)
    }

    async setGameRating(rating) {
        console.log("Rate game to:", rating)

    }


    renderGames(games) {
        if (games.length === 0) return <div>No games in History</div>

        let extractedGames = [];
        for (let key in games) {
            let indivisualGame = games[key];
            extractedGames.push(indivisualGame);
        }
        let gameDisplays = [];

        extractedGames[0].forEach((element, i) => {
            gameDisplays.push(
                <tbody key={i} className={'col' + (i % 2)}>
                    {displayGames(element, this.onchange, i)}
                </tbody>)
        }, this);
        return gameDisplays;
    }

    render() {
        if (!this.state.games) {
            return <LoaderPage />
        }
        return (
            <div className="panel-group col-xs-10 col-xs-offset-1">
                <div className="panel panel-default rsb-game-panel">
                    <div className="panel-heading text-center">
                        <h3>Game History</h3>
                    </div>
                    <div className="panel-body">
                        <div className="row">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Game Name</th>
                                        <th>Sport</th>
                                        <th>Date/Time</th>
                                        <th>Rating</th>
                                    </tr>
                                </thead>
                                {this.renderGames(this.state.games)}
                            </table>

                        </div>
                    </div>
                </div>
            </div >
        )
    }
}

export default GameHistory;
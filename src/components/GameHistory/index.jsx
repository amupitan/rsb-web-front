import React, { Component } from 'react';

import { getLoggedInUserName, getGameHistory } from '../../lib/user';
import { Notifiable } from "../../mixins";

import DisplayGames from './DisplayGames';
import { LoaderPage } from '../ui/Loader';

import './style.css';

class GameHistory extends Notifiable(Component) {

    constructor(props) {
        super(props);
        this.state = {}

        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        this.getGameHistory();
    }

    async getGameHistory() {
        const username = getLoggedInUserName();
        const games = await getGameHistory(username);
        if (games.error) {
            this.setState({ errorMessage: games.error });
            return;
        }
        this.setState({
            games: games
        });

    }

    onChange(num) {
        this.setGameRating(num)
    }

    //TODO: Rate game correctly
    async setGameRating(rating) {
        console.log("Rate game to:", rating)
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
                                        <th>Date</th>
                                        <th>Age Range</th>
                                        <th>Rating</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/*TODO: the first 'i' is for the game rating. This will change when game rating get's incorperated. The second 'i'
                                    is used for the zebra affect
                                    */}
                                    {this.state.games.map((game, i) => (<DisplayGames key={i} {...game} onChange={this.onChange} rate={i} i={i} />))}
                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>
            </div >
        )
    }
}

export default GameHistory;
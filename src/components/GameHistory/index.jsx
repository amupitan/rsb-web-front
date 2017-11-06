import React, { Component } from 'react';

import { getLoggedInUserName, getGameHistory } from '../../lib/user';
import { rateGame } from '../../lib/game';
import { Notifiable } from "../../mixins";

import { LoaderPage } from '../ui/Loader';
import GameList from './GameList';

import './style.css';

class GameHistory extends Notifiable(Component) {

    constructor(props) {
        super(props);
        this.state = {};

        this.handleRatingChange = this.handleRatingChange.bind(this);
        this.setGameRating = this.setGameRating.bind(this);
    }

    componentDidMount() {
        this.getGameHistory({ ...this.props.match.params });
    }

    async getGameHistory({ username = getLoggedInUserName() } = {}) {
        const games = await getGameHistory({ username });
        if (games.error) {
            this.setState({ errorMessage: games.error });
            return;
        }

        this.setState({
            games: games,
            errorMessage: null,
        });

    }

    handleRatingChange(rating) {
        const { username } = this.props.match.params;
        if (!username || username === getLoggedInUserName()) {
            this.setGameRating(rating);
            return;
        }

        this.setState({ errorMessage: 'You can only rate your previous games' });
    }

    async setGameRating({ rating, id }) {
        const res = await rateGame({ rating, id });
        if (res.error) {
            this.setState({ errorMessage: res.error });
            return;
        }

        this.getGameHistory({ ...this.props.match.params });
    }

    renderError(errorMessage) {
        if (errorMessage) {
            return (
                <p style={{ color: 'red', textAlign: 'center' }}>{errorMessage}</p>
            );
        }
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
                    {this.renderError(this.state.errorMessage)}
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
                                    {this.state.games.map((game, i) => (<GameList key={i} {...game} onRatingChange={this.handleRatingChange} index={i} />))}
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
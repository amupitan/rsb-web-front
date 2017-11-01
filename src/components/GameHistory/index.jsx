import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { getLoggedInUserName } from '../../lib/user';
import { getGameHistory } from '../../lib/game';
import { Notifiable } from "../../mixins";

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

    renderGames(games) {
        if (games.length === 0) return <div>No games in History</div>

        return (<div>Games go here </div>)
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
                            {this.renderGames(this.state.games)}
                        </div>
                    </div>
                </div>
            </div >


        )
    }
}

export default GameHistory;
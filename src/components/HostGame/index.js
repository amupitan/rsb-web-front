import React, { Component } from 'react';

import { createGame } from '../../lib/game';
import { Notifiable } from "../../mixins";

import RSBButton from '../ui/RSBButton';
import GamePanel from '../ui/GamePanel';

import './style.css';

class HostPage extends Notifiable(Component) {
    constructor(props) {
        super(props);
        this.render = this.render.bind(this);
        this.handleHostSubmit = this.handleHostSubmit.bind(this);

        this.state = {
            error: "",
        };

    }

    async handleHostSubmit(game) {
        console.log(game);
        const result = {
            name: game.gameName,
            startTime: (new Date(game.date + ":" + game.startTime)).toISOString(),
            endTime: (new Date(game.date + ":" + game.endTime)).toISOString(),
            sport: +game.sport,
            maxAge: +game.maximumAge,
            minAge: +game.minimumAge,
            private: game.private,
            lat: +game.lat,
            lng: +game.lng,
        }

        const res = await createGame(result);
        if (res && res.error) {
            console.log(res.error);
            this.setState({ error: res.error });
        }
    }

    render() {
        console.log('render bb');

        return (
            <GamePanel title='Host Game' onSubmit={this.handleHostSubmit} error={this.state.error}/>
        );
    }

}

export default HostPage;

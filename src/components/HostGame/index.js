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
            error: null,
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
            this.setState({ error: res.error });
        }
    }

    render() {

        return (
            <GamePanel title='Host Game' onSubmit={this.handleHostSubmit} />
        );
    }

}

export default HostPage;

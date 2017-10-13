import React, { Component } from 'react';

import { joinGame } from '../../lib/game';
import constraints from '../../lib/constraints';
import { Notifiable } from '../../mixins';

import RSBButton from '../ui/RSBButton';

import './style.css';

class Join extends Notifiable(Component) {
    constructor(props) {
        super(props);
        this.state = {
            joinMessage: 'Please enter your game join code',
            messageType: 'text-info',
            currentCode: '',
        }

        //ES6 React.Component doesn't auto bind methods to itself. You need to bind them yourself
        this.render = this.render.bind(this);
        this.sendCode = this.sendCode.bind(this);
        this.validateCode = this.validateCode.bind(this);
        this.showError = this.showError.bind(this);
        this.handleCodeChange = this.handleCodeChange.bind(this);
    }

    validateCode(code) {
        if (code.length !== 7) {
            this.showError('The join code must be 7 characters');
            return false;
        }
        return true;
    }

    showError(error) {
        this.setState({
            joinMessage: error,
            messageType: "text-danger"
        });
    }

    async sendCode(accessCode) {
        //here we will check the access code and get back a message

        //No game with this code exists.. Please try again.
        //Sorry, this game is full!
        //Sorry, you already have a game during this time!

        //You successfully joined {game name}       
        const code = this.state.currentCode;
        if (!this.validateCode(code)) {
            return;
        }

        const result = await joinGame({ joincode: code }, { byId: false, source: '/join' }); //TODO: change it to this.props.location.path

        // This part is gotten to only if there's an error otherwise 
        // the user is redirected
        if (result && result.error) {
            //TODO handle error
            this.showError(result.error)
        }


    }

    handleCodeChange(event) {
        this.setState({
            currentCode: event.target.value.replace(/[\W_]+/g, '').substring(0, constraints.MAX_JOINCODE_LENGTH).toUpperCase(),
        });
    }

    render() {
        return (
            <div>
                <span className="text-center">
                    <h1>Join Game</h1>
                </span>
                <div className="container">
                    <span className="row">
                        <span className="col-xs-5 col-xs-offset-3 rsb-join-game-input-container">
                            <input value={this.state.currentCode} className="form-control" type="text" placeholder="Enter a game code to join.." onChange={this.handleCodeChange} />
                        </span>
                        <span className="col-xs-1 ">
                            <RSBButton
                                text="Submit"
                                buttonType="success"
                                onClickFunction={() => (this.sendCode())}
                            />
                        </span>
                    </span>
                </div>
                <div className="text-center">
                    <span className={this.state.messageType}>{this.state.joinMessage}</span>
                </div>
            </div>
        )
    }
}

export default Join;

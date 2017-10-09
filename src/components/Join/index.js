import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import RSBButton from '../ui/RSBButton';

import './style.css';

class Join extends Component {
    constructor(props) {
        super(props);
        this.state = {
            joinMessage: "Test message",
            messageType: "text-danger",
            currentCode: ""
        }

        //ES6 React.Component doesn't auto bind methods to itself. You need to bind them yourself
        this.render = this.render.bind(this);
        this.checkCode = this.checkCode.bind(this);
        this.handleCodeChange = this.handleCodeChange.bind(this);
    }

    checkCode(accessCode){
        //here we will check the access code and get back a message

        //No game with this code exists.. Please try again.
        //Sorry, this game is full!
        //Sorry, you already have a game during this time!

        //You successfully joined {game name}       
        
        this.setState({
            joinMessage: "A success or error message may go here",
            messageType: "text-success"
        });
    }

    handleCodeChange(event){
        this.setState({
            currentCode: event.target.value
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
                            <input value={this.state.currentCode} className="form-control" type="number" placeholder="Enter a game code to join.." onChange={this.handleCodeChange}/>
                        </span>
                        <span className="col-xs-1 ">
                            <RSBButton
                                text="Submit"
                                buttonType="success"
                                onClickFunction={() => (this.checkCode(this.state.currentCode))}
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

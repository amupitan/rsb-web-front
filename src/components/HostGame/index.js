import React, { Component } from 'react';

import './style.css';
import RSBButton from '../ui/RSBButton';

/**
 * Modals are different because we don't have to rerender the page for it to show.
 * 
 * Every modal you use should be visible by the browser at all times
 * 
 * This modal is specifically to host a game
 * 
 */

class HostPage extends Component {
    constructor(props) {
        super(props);
        this.render = this.render.bind(this);
    }

    render() {
        let sportsOption = ["Soccer", "Basketball", "Volleyball", "Football", "Tennis", "Other"];
        let sportsButtons = [];

        sportsOption.forEach((sport, i) => {
            sportsButtons.push(
                <div className="col-sm-1" key={i}>
                    <RSBButton
                        text={sport}
                        onClickFunction={() => {
                            console.log("Clicked: ", { sport })
                        }}
                        key={i}
                    />
                </div>)
        })

        return (
            <div className=" panel panel-default col-xs-6 col-xs-offset-3">
                <div className="panel-heading text-center">
                    <h4>Host Game</h4>
                </div>
                <div className="panel-body">
                    {/* Game name */}
                    <label htmlFor="game-code" className="form-control-label">Name of game:</label>
                    <input type="text" className="form-control" id="game-code" />
                    <br />
                    {/* Sport */}
                    <label htmlFor="game-sport" className="form-control-label">Sport:</label>
                    <div className="container row">
                        {sportsButtons}
                    </div>
                    <br />
                    {/* Number of players */}
                    <label>Number of players: </label>
                    <input type="number" min="0" />
                    <br /><br />
                    {/* Start time / End Time */}
                    <div>
                        <label>Duration: </label>
                        <input type="time" name="usr_time" />
                        <input type="time" name="usr_time" />
                        <input type="submit" />
                    </div>
                    <br />
                    {/* Invite Friends */}
                    <div className="friend-invite container row">
                        <p>Invite Friends: </p>
                    </div>
                    <br />
                    {/* Search Location */}
                    <input type="text" className="form-control" placeholder="Search Location" name="srch-term" id="srch-term" />
                    <RSBButton
                        glyphicons="glyphicon glyphicon-map-marker"
                        onClickFunction={() => {
                            console.log("Go to map to drop pin!");
                        }}
                    />
                </div>
                <div className="modal-footer">
                    <RSBButton
                        text="Cancel"
                        className="btn btn-default close-btn"
                        onClickFunction={() => {
                            console.log("Cancel game");
                        }
                        }
                    />
                    <RSBButton
                        text="Host"
                        className="btn btn-info submit-btn"
                        onClickFunction={() => {
                            console.log("Host game!");
                        }}
                    />
                </div>
            </div>
        );
    }
}

export default HostPage;

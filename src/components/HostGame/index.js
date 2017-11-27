import React, { Component } from 'react';

import { sports, getDuration, createGame } from '../../lib/game';
import { DateUtils } from '../../lib/utils';
import { Notifiable } from "../../mixins";

import SearchAddress from '../SearchAddress';
import RSBButton from '../ui/RSBButton';

import './style.css';

class HostPage extends Notifiable(Component) {
    constructor(props) {
        super(props);
        this.render = this.render.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleSportChange = this.handleSportChange.bind(this);
        this.handleStartChange = this.handleStartChange.bind(this);
        this.handleEndChange = this.handleEndChange.bind(this);
        this.handleMinAgeChange = this.handleMinAgeChange.bind(this);
        this.handleMaxAgeChange = this.handleMaxAgeChange.bind(this);
        this.handleHostSubmit = this.handleHostSubmit.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handlePrivateFlagChange = this.handlePrivateFlagChange.bind(this);
        this.onSearchAddress = this.onSearchAddress.bind(this);

        this.state = {
            gameName: "",
            sport: 0, // pick first sport
            startTime: DateUtils.getTimeAfter({ minutes: 15 }), // 15 mins after the current time
            endTime: DateUtils.getTimeAfter({ minutes: 15 + getDuration(sports[0]) }), // 15 mins + sport duration after the current time
            minimumAge: "",
            maximumAge: "",
            private: false,
            position: { lat: null, lng: null },
            date: DateUtils.yyyymmdd(),

            error: null,
        };

        this.hasSetEndTime = false;
    }

    handleNameChange(event) {
        this.setState({
            gameName: event.target.value
        });
    }

    handleSportChange(event) {
        const sport = event.target.value;
        this.setState({
            sport: sport,
        });

        //TODO: use setState updater instead of batching calls
        if (!this.hasSetEndTime) {
            this.setState({
                endTime: DateUtils.getTimeAfter({ minutes: 15 + getDuration(sports[sport]) }),
            });
        }
    }

    handleStartChange(event) {
        this.setState({
            startTime: event.target.value
        });
    }

    handleEndChange(event) {
        this.hasSetEndTime = true;
        this.setState({
            endTime: event.target.value
        });
    }

    handleMinAgeChange(event) {
        const age = event.target.value;
        this.setState({
            minimumAge: age < 1 ? 1 : age,
        });
    }

    handleMaxAgeChange(event) {
        const age = event.target.value;
        this.setState({
            maximumAge: age < 1 ? 1 : age,
        });
    }

    onSearchAddress(position) {
        this.setState({
            position: position,
        });

    }

    handleDateChange(event) {
        this.setState({
            date: event.target.value
        });
    }

    handlePrivateFlagChange(event) {
        this.setState({ private: event.target.checked });
    }

    async handleHostSubmit() {
        const result = {
            name: this.state.gameName,
            startTime: (new Date(this.state.date + ":" + this.state.startTime)).toISOString(),
            endTime: (new Date(this.state.date + ":" + this.state.endTime)).toISOString(),
            sport: +this.state.sport,
            maxAge: +this.state.maximumAge,
            minAge: +this.state.minimumAge,
            private: this.state.private,
            lat: +this.state.position.lat,
            lng: +this.state.position.lng,
        }

        const res = await createGame(result);
        if (res && res.error) {
            this.setState({ error: res.error });
        }
    }

    render() {

        const sportsOptions = [];
        for (const i in sports) {
            sportsOptions.push(<option key={i} value={i} label={sports[i]}></option>);
        }

        return (
            <div className="col-xs-6 col-xs-offset-3">
                <br />
                <div className="panel panel-default">
                    <div className="panel-heading text-center">
                        <h4>Host Game</h4>
                    </div>
                    <p style={{ color: 'red', marginTop: '5px', textAlign: 'center' }}>{this.state.error}</p>
                    <div className="panel-body">
                        {/* Game name */}
                        <label htmlFor="game-code" className="form-control-label">Name of game:</label>
                        <input type="text" value={this.state.gameName} className="form-control" id="game-code" onChange={this.handleNameChange} />
                        <br />
                        {/* Sport */}
                        <label htmlFor="game-sport" className="form-control-label">Sport:</label>
                        <select className="form-control" value={this.state.sport} onChange={this.handleSportChange}>
                            {sportsOptions}
                        </select>
                        <br /><br />
                        {/* Start time / End Time */}
                        <label htmlFor="timeInputs">Duration: </label>
                        <br />
                        <div className="row" name="timeInputs" id="timeInputs">
                            <div className="col-xs-4">
                                <label htmlFor="startTime">From</label>
                                <input className="form-control" name="startTime" type="time" value={this.state.startTime} onChange={this.handleStartChange} />
                            </div>
                            <div className="col-xs-4">
                                <label htmlFor="endTime">Until</label>
                                <input className="form-control" name="endTime" type="time" value={this.state.endTime} onChange={this.handleEndChange} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xs-6">

                                <label htmlFor="rsbGameDate">Date</label>
                                <input className="form-control" name="rsbGameDate" type="date" value={this.state.date} onChange={this.handleDateChange} />
                            </div>
                        </div>

                        <br /><br />

                        {/* Private Flag */}
                        <label htmlFor="game-private" className="form-control-label">Private:</label>
                        <p className="small">Check this box to make this game private and only accessible by invited players</p>
                        <input name="private" type="checkbox" checked={this.state.private} onChange={this.handlePrivateFlagChange} />
                        <br /><br />

                        {/*Age Range*/}
                        <label htmlFor="ageRange">Age Range: </label>
                        <br />
                        <div className="row" name="ageRange" id="ageRange">
                            <div className="col-xs-4">
                                <label htmlFor="startTime">From</label>
                                <input className="form-control" name="minAge" type="number" value={this.state.minimumAge} onChange={this.handleMinAgeChange} />
                            </div>
                            <div className="col-xs-4">
                                <label htmlFor="endTime">To</label>
                                <input className="form-control" name="maxAge" type="number" value={this.state.maximumAge} onChange={this.handleMaxAgeChange} />
                            </div>
                        </div>

                        <br /><br />

                        {/*Location based on Latitude and Longitude*/}
                        <label htmlFor="location">Location: </label>
                        <br />

                        <div className="row" name="location" id="location">
                            <div className="col-xs-12">
                                <SearchAddress onPlacesChanged={this.onSearchAddress} />
                            </div>
                        </div>

                        <br /><br />

                    </div>
                    <div className="modal-footer">
                        <div>
                            <RSBButton
                                text="Host"
                                className="btn btn-info rsb-host-submit-btn col-xs-2"
                                onClickFunction={() => {
                                    this.handleHostSubmit()
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default HostPage;

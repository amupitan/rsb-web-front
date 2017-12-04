import React, { Component } from 'react';

import { sports, getDuration } from '../../../lib/game';
import { DateUtils } from '../../../lib/utils';

import SearchAddress from '../../SearchAddress';
import RSBButton from '../RSBButton';

import './style.css';

//title, onSubmit

class HostPage extends Component {
    constructor(props) {
        super(props);

        this.title = this.props.title;

        this.render = this.render.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleSportChange = this.handleSportChange.bind(this);
        this.handleStartChange = this.handleStartChange.bind(this);
        this.handleEndChange = this.handleEndChange.bind(this);
        this.handleMinAgeChange = this.handleMinAgeChange.bind(this);
        this.handleMaxAgeChange = this.handleMaxAgeChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handlePrivateFlagChange = this.handlePrivateFlagChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onSearchAddress = this.onSearchAddress.bind(this);
        this.convertDate = this.convertDate.bind(this);

        this.state = {
            gameName: props.game ? props.game.name : "",
            sport: props.game ? props.game.sport : 0, // pick first sport
            startTime: DateUtils.getTimeAfter({ minutes: 15 }), // 15 mins after the current time
            endTime: DateUtils.getTimeAfter({ minutes: 15 + getDuration(sports[0]) }), // 15 mins + sport duration after the current time
            minimumAge: props.game ? props.game.agerange[0].toString() : "",
            maximumAge: props.game ? props.game.agerange[1].toString() : "",
            private: props.game ? props.game.private : false,
            position: props.game ? props.game.location : { lat: null, lng: null },
            date: DateUtils.yyyymmdd(),

            hasSetEndTime: this.props ? true : false
        };
    }

    componentWillMount() {
        this.convertDate();
    }

    //uses the startTime and duration to create date and time objects
    async convertDate() {
        if (this.props.game) {

            const res = DateUtils.convertToTimes(this.props.game.startTime, this.props.game.duration);

            this.setState({
                date: DateUtils.yyyymmdd({dateString : res.gameDate}),
                startTime: DateUtils.hhmm({timeString: res.startTime}),
                endTime:  DateUtils.hhmm({timeString: res.endTime}),
            });
        }
    }

    handleSubmit() {
        const game = {
            gameName: this.state.gameName,
            date: this.state.date,
            startTime: this.state.startTime,
            endTime: this.state.endTime,
            sport: this.state.sport,
            maximumAge: this.state.maximumAge,
            minimumAge: this.state.minimumAge,
            private: this.state.private,
            lat: this.state.position.lat,
            lng: this.state.position.lng,
        }
        this.props.onSubmit(game);
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
        if (!this.state.hasSetEndTime) {
            this.setState({
                endTime: DateUtils.getTimeAfter({ minutes: 15 + getDuration(sports[sport]) }),
                hasSetEndTime: true
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

    render() {

        const cancelButton = this.props.onCancel ?
            <RSBButton
                text="Cancel"
                className="btn btn-warning rsb-edit-cancel-btn pull-right"
                onClickFunction={this.props.onCancel}
            />
            : null;

        const sportsOptions = [];
        for (const i in sports) {
            sportsOptions.push(<option key={i} value={i} label={sports[i]}></option>);
        }

        return (

            <div className="col-xs-6 col-xs-offset-3">
                <br />
                <div className="panel panel-default">
                    <div className="panel-heading text-center">
                        <h4>{this.title}</h4>
                    </div>
                    <p style={{ color: 'red', marginTop: '5px', textAlign: 'center' }}>{this.props.error}</p>
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
                                <SearchAddress onPlacesChanged={this.onSearchAddress} location={this.state.position} />
                            </div>
                        </div>

                        <br /><br />

                    </div>

                    <div className="modal-footer">
                        <div className="row text-center">
                            <div className="col-xs-6">
                                <RSBButton
                                text={this.props.buttonText}
                                className="btn btn-info rsb-host-submit-btn pull-left"
                                onClickFunction={this.handleSubmit}
                                 />
                            </div>
                            <div className="col-xs-6">
                                {cancelButton}
                            </div>
                        </div>                      
                    </div>

                </div>
            </div>
        );
    }
}

export default HostPage;

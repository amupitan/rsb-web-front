import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types';
import classnames from 'classnames';
import RSBButton from '../ui/RSBButton';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

import './style.css';

export class MapPage extends Component {
    constructor(props) {
        super(props);
        this.render = this.render.bind(this);
        this.getLocation = this.getLocation.bind(this);
        this.showPosition = this.showPosition.bind(this);
        this.onMarkerClick = this.onMarkerClick.bind(this);
        this.onMapClicked = this.onMapClicked.bind(this);
        this.handleJoinGame = this.handleJoinGame.bind(this);
        this.state = {
            latitude: 42.0308,
            longitude: -93.6319,
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
        }
    }

    handleJoinGame(id){
        console.log("handle the user joining the game " + id);
    }

    //handles the event of a game icon being clicked
    onMarkerClick(props, marker, e) {
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });
        ReactDOM.render(
            <button onClick={() => this.handleJoinGame(props.id)} className="btn btn-success">Join Game</button>
            ,
            document.getElementById('rsb-map-join-game-window')
        );
    }

    //handles the closing of a game option
    onMapClicked(props) {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            })
        }
    }

    showPosition(position) {
        this.setState(() => ({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }));
        console.log(this.state);
    }
    
    getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.showPosition);
        } 
    }

    //Uses the google-maps-react library components
    render() {
        return (
            <div className="rsb-main-map">
                <Map 
                google={this.props.google} 
                zoom={14}
                clickableIcons={false}
                initialCenter={{
                    lat: this.state.latitude,
                    lng: this.state.longitude
                }}
                
                >
                    <Marker
                        onClick={this.onMarkerClick}
                        title={'There is a game here'}
                        name={'Game 1'}
                        id={1}
                        position={{ lat: 42.0308, lng: -93.6319 }} />
                    <Marker
                        onClick={this.onMarkerClick}
                        title={'There is a game here'}
                        name={'Game 2'}
                        id={2}
                        position={{ lat: 42.041421, lng: -93.6438976 }} />
                    <InfoWindow
                        marker={this.state.activeMarker}
                        visible={this.state.showingInfoWindow}>
                        <div>
                            <h1>{this.state.selectedPlace.name}</h1>
                            <div id="rsb-map-join-game-window">

                            </div>
                        </div>
                    </InfoWindow>
                </Map>
            </div>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyABplRWPbn89WsMUko7bMI83SXCiWVTHLY',
    version: '3.28'
})(MapPage)


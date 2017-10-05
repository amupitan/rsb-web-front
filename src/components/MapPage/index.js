import React, { Component } from 'react';
import ReactDOM from 'react-dom'

import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

import MockData from '../../dummy';

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
        this.fetchPlaces = this.fetchPlaces.bind(this);
        this.renderGameInfoWindow = this.renderGameInfoWindow.bind(this);
        this.renderMarkers = this.renderMarkers.bind(this);

        let initialCenter = this.getInitialCenter();

        this.state = {
            position: initialCenter,
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
            markers: this.getMarkers(initialCenter),
        }
    }

    // Gets the postion of the user's location
    // This gets called when the map is initially being created
    // If the user doesn't provide a location, this should make
    // an intelligent guess.
    getInitialCenter() {
        // TODO
        return { lat: 42.0308, lng: -93.6319 };
    }

    // Makes a call to the server to get all markers
    // returns the list of markers
    getMarkers({ lat, lng }) {
        // TODO
        console.log(`lat: ${lat} lng: ${lng}`);
        return MockData('games/l/lng/0/lat/0')({ lat, lng });
    }

    // Gets called when a user tries to join a game
    // Should make a server call and do the necessary work
    handleJoinGame(id) {
        // TODO
        console.log("handle the user joining the game " + id);
    }

    // Handles the event of a game icon being clicked
    // displays the game info box
    onMarkerClick(props, marker, e) {
        // TODO
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

    // Handles the closing of a game option
    onMapClicked() {
        // TODO
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            })
        }
    }

    //sets the latitude and longitude in the state
    showPosition(position) {
        this.setState(() => ({
            lat: position.coords.latitude,
            lng: position.coords.longitude
        }));
    }

    //gets a users current location bases on location services
    getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.showPosition);
        }
    }

    // Causes a render of new markers by invalidating the map
    fetchPlaces(mapProps, map) {
        let center = map.getCenter();
        this.setState({
            markers: this.getMarkers({ lat: center.lat(), lng: center.lng() }),
        });
    }

    // Renders the game info window
    renderGameInfoWindow() {
        return <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}>
            <div>
                <h1>{this.state.selectedPlace.name}</h1>
                <div id="rsb-map-join-game-window">

                </div>
            </div>
        </InfoWindow>
    }

    // Renders all available markers
    renderMarkers() {
        return this.state.markers.map((marker, i) => {
            return <Marker
                onClick={this.onMarkerClick}
                title={marker.title}
                name={marker.name}
                id={i}
                key={i}
                position={marker.position} />
        })

    }

    render() {
        return (
            <div className="rsb-main-map">
                <Map
                    google={this.props.google}
                    zoom={14}
                    clickableIcons={false}
                    initialCenter={this.state.position}
                    onDragend={this.fetchPlaces}
                    onReady={this.fetchPlaces}>

                    {this.renderMarkers()}
                    {this.renderGameInfoWindow()}
                </Map>
            </div>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyABplRWPbn89WsMUko7bMI83SXCiWVTHLY',
    version: '3.28'
})(MapPage)


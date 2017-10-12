import React, { Component } from 'react';
import ReactDOM from 'react-dom'

import { getCurrentLocation } from '../../lib/map';
import { getGamesNearLocation, sports, joinGame } from '../../lib/game';

import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import { LoaderPage } from '../ui/Loader';


import './style.css';

export class MapPage extends Component {
    constructor(props) {
        super(props);
        this.render = this.render.bind(this);
        this.onMarkerClick = this.onMarkerClick.bind(this);
        this.onMapClicked = this.onMapClicked.bind(this);
        this.handleJoinGame = this.handleJoinGame.bind(this);
        this.fetchPlaces = this.fetchPlaces.bind(this);
        this.renderGameInfoWindow = this.renderGameInfoWindow.bind(this);
        this.renderMarkers = this.renderMarkers.bind(this);
        this.getLocation = this.getLocation.bind(this);

        this.state = {
            position: null,
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
            markers: [],
        }
    }

    // Gets the initial postion of the user's location
    // This gets called when the map is initially being created
    // If the user doesn't provide a location, this should make
    // an intelligent guess.
    componentWillMount() {
        this._isMounted = true;
        this.getLocation();
    }

    // Gets the postion of the user's location
    async getLocation() {
        const currentLocation = await getCurrentLocation();
        if (!this._isMounted) return;
        this.setState({
            position: currentLocation,
            markers: await this.getMarkers(currentLocation),
        });
    }

    // Makes a call to the server to get all markers
    // returns the list of markers
    async getMarkers({ lat, lng }) {
        const result = await getGamesNearLocation({ lat, lng });
        if (result.error) {
            //TODO notify user of error
            console.log(result.error);
            return [];
        }
        return result;
    }

    // Gets called when a user tries to join a game
    // Should make a server call and do the necessary work
    handleJoinGame(game) {
        if (!game) return;
        joinGame(game, { byId: true, source: '/map' }); //TODO: use location
    }

    // Handles the event of a game icon being clicked
    // displays the game info box
    onMarkerClick(props, marker, e) {
        this.setState({
            selectedPlace: props.game,
            activeMarker: marker,
            showingInfoWindow: true
        });
        ReactDOM.render(
            <button onClick={() => this.handleJoinGame(props.game)} className="btn btn-success">Join Game</button>
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
                activeMarker: null,
            })
        }
    }

    // Causes a render of new markers by invalidating the map
    async fetchPlaces(mapProps, map) {
        if (!this._isMounted) return;
        const center = map.getCenter();
        console.log(`lat: ${center.lat()} lng: ${center.lng()}`);
        this.setState({
            markers: await this.getMarkers({ lat: center.lat(), lng: center.lng() }),
        });
    }

    // Renders the game info window
    renderGameInfoWindow() {
        return <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}>
            <div>
                <GameInfo {...this.state.selectedPlace} />
                <div id="rsb-map-join-game-window"></div>
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
                id={i} //TODO: make this {marker.game.id}?
                key={i}
                position={marker.location}
                game={toGame(marker)}
            />
        })

    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        if (!this.state.position) {
            return <LoaderPage />;
        }
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

// GameInfo is dislayed after a marker is clicked
const GameInfo = ({ name, agerange, duration, sport, startTime, host }) => {
    const age = (agerange && [...agerange]) || [0, 0];
    const time = (new Date(startTime)).toTimeString();

    return (
        <div>
            <h1>{name}</h1>
            <p><strong>Minimum Age:</strong>{age[0]} <strong>Maximum Age: </strong>{age[1]}</p>
            <p><strong>Start time: </strong>{time}</p>
            <p><strong>Sport: </strong>{sports[sport]} </p>
            <p><strong>Host: </strong>{host} </p>
            <p><strong>Duration: </strong>{duration}</p>
        </div>
    );
};

//TODO: return a filtered game to be displayed
const toGame = (game) => game;


export default GoogleApiWrapper({
    apiKey: 'AIzaSyABplRWPbn89WsMUko7bMI83SXCiWVTHLY',
    version: '3.28'
})(MapPage)


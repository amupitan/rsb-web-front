import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import { Link, BrowserRouter as Router } from 'react-router-dom';

import { Notifiable } from "../../mixins";
import { getCurrentLocation } from '../../lib/map';
import Game, { getGamesNearLocation, joinGame, leaveGame } from '../../lib/game';
import { googleApiKey, googleApiVersion } from '../../lib/map';
import user, { getLoggedInUserName } from '../../lib/user';

import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import { LoaderPage } from '../ui/Loader';
import GameInfo from './GameInfo';
import JoinNewGameModal from './JoinNewGameModal'
import SearchAddress from '../SearchAddress'

import './style.css';

export class MapPage extends Notifiable(Component) {
    constructor(props) {
        super(props);
        this.render = this.render.bind(this);
        this.onMarkerClick = this.onMarkerClick.bind(this);
        this.onMapClicked = this.onMapClicked.bind(this);
        this.onAddressSearch = this.onAddressSearch.bind(this);
        this.handleJoinGame = this.handleJoinGame.bind(this);
        this.fetchPlaces = this.fetchPlaces.bind(this);
        this.renderGameInfoWindow = this.renderGameInfoWindow.bind(this);
        this.renderMarkers = this.renderMarkers.bind(this);
        this.getLocation = this.getLocation.bind(this);
        this.checkGame = this.checkGame.bind(this);
        this.openVerificationModal = this.openVerificationModal.bind(this);
        this.closeVerificationModal = this.closeVerificationModal.bind(this);
        this.joinDifferentGame = this.joinDifferentGame.bind(this);

        this.state = {
            position: null,
            showingInfoWindow: false,
            inAnyGame: false,
            modalHidden: 'none',
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
        this.checkGame();
        this.getLocation();
    }

    async checkGame() {
        const currentGame = await Game();
        console.log(currentGame);
        if (currentGame.error) {
            this.setState({
                inAnyGame: false
            });
        }
        else {
            this.setState({
                inAnyGame: true
            });
        }
        return currentGame;
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
            console.error(result.error);
            return [];
        }
        return result;
    }

    openVerificationModal() {
        this.setState({
            modalHidden: 'block'
        });
    }

    closeVerificationModal() {
        this.setState({
            modalHidden: 'none'
        });
    }

    async joinDifferentGame(newGame) {
        const currentGame = await this.checkGame();
        await leaveGame(currentGame.id);
        await joinGame(this.state.selectedPlace);

    }

    // Gets called when a user tries to join a game
    // Should make a server call and do the necessary work
    handleJoinGame(game) {
        if (!game) return;
        joinGame(game, { byId: true, source: '/map' }); //TODO: use location
        this.setState({
            inAnyGame: true
        });
    }

    //When a user clicks leave game on the map
    handleLeaveGame(game) {
        if (!game) return;
        leaveGame(game.id);
        this.setState({
            inAnyGame: false
        });
    }

    // Handles the event of a game icon being clicked
    // displays the game info box
    async onMarkerClick(props, marker, e) {
        this.setState({
            selectedPlace: props.game,
            activeMarker: marker,
            showingInfoWindow: true
        });

        //check to see if a user is in a game
        const currentUser = getLoggedInUserName();
        let inCurrentGame = false;
        if (this.state.selectedPlace.members) {
            this.state.selectedPlace.members.map(function (member) {
                if (member.username === currentUser) {
                    inCurrentGame = true;
                }
            });
        }

        if (inCurrentGame) {
            ReactDOM.render(
                <button onClick={() => this.handleLeaveGame(props.game)} className="btn btn-danger">Leave Game</button>
                ,
                document.getElementById('rsb-map-join-game-window')
            );
        }
        else if (!this.state.inAnyGame) {
            ReactDOM.render(
                <Router>
                    <span>
                        <Link to={`/game`}>
                            <button onClick={() => this.handleJoinGame(props.game)} className="btn btn-success">Join Game</button>
                        </Link>
                    </span>
                </Router>
                ,
                document.getElementById('rsb-map-join-game-window')
            );
        }
        else {
            ReactDOM.render(
                <div>
                    <Router>
                        <span>
                            <Link to={`/game`}>
                                <button
                                    className="btn btn-success"
                                    onClick={this.openVerificationModal}>
                                    Join Game</button>
                            </Link>
                        </span>
                    </Router>
                </div>
                ,
                document.getElementById('rsb-map-join-game-window')
            );
        }
    }

    // Handles the closing of a game option
    onMapClicked() {
        this.setState((prevState) => {
            if (prevState.showingInfoWindow)
                return {
                    showingInfoWindow: false,
                    activeMarker: null,
                }
        });
    }

    onAddressSearch(position) {
        this.setState({
            position: position,
        });
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
            onClose={this.onMapClicked}
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}>
            <div>
                {<GameInfo {...this.state.selectedPlace} />}
                <div id="rsb-map-join-game-window"></div>
            </div>
        </InfoWindow>
    }



    renderSearchAddress() {
        return <SearchAddress
            onPlacesChanged={this.onAddressSearch}
            className='rsb-map-search-bar'
        />
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
                    center={this.state.position}
                    onReady={this.fetchPlaces}>

                    {this.renderSearchAddress()}
                    {this.renderMarkers()}
                    {this.renderGameInfoWindow()}
                    <JoinNewGameModal display={this.state.modalHidden} onCloseFunction={this.closeVerificationModal} joinFunction={this.joinDifferentGame} />
                </Map>
            </div>
        );
    }
}

//TODO: return a filtered game to be displayed
const toGame = (game) => game;


export default GoogleApiWrapper({
    apiKey: googleApiKey,
    version: googleApiVersion,
})(MapPage)


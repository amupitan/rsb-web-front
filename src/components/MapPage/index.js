import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link, BrowserRouter as Router } from 'react-router-dom';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

import Game, { getGamesNearLocation, joinGame, leaveGame } from '../../lib/game';
import { googleApiKey, googleApiVersion, getCurrentLocation } from '../../lib/map';
import { getLoggedInUserName } from '../../lib/user';

import { LoaderPage } from '../ui/Loader';
import GameInfo from './GameInfo';
import JoinNewGameModal from './JoinNewGameModal'
import SearchAddress from '../SearchAddress'

import './style.css';
import { showError, showSuccess } from '../../mixins/notifiable';

export class MapPage extends Component {
    constructor(props) {
        super(props);

        this.handleLeaveGame = this.handleLeaveGame.bind(this);

        this.onMarkerClick = this.onMarkerClick.bind(this);
        this.onMapClicked = this.onMapClicked.bind(this);
        this.onAddressSearch = this.onAddressSearch.bind(this);
        this.handleJoinGame = this.handleJoinGame.bind(this);
        this.fetchPlaces = this.fetchPlaces.bind(this);
        this.renderGameInfoWindow = this.renderGameInfoWindow.bind(this);
        this.renderMarkers = this.renderMarkers.bind(this);
        this.getLocation = this.getLocation.bind(this);
        this.openVerificationModal = this.openVerificationModal.bind(this);
        this.closeVerificationModal = this.closeVerificationModal.bind(this);
        this.joinDifferentGame = this.joinDifferentGame.bind(this);
        this.getGame = this.getGame.bind(this);
        this.renderActionButton = this.renderActionButton.bind(this);

        this.state = {
            position: null,
            showingInfoWindow: false,
            modalDisplay: false,
            activeMarker: {},
            selectedGame: {},
            markers: [],
            currentGame: {},
        }
    }

    // Gets the initial postion of the user's location
    // This gets called when the map is initially being created
    // If the user doesn't provide a location, this should make
    // an intelligent guess.
    componentDidMount() {
        this._isMounted = true;
        this.getLocation();
        this.getGame();
    }

    componentDidUpdate() {
        if (this.state.showingInfoWindow) {
            this.renderActionButton();
        }
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

    async getGame() {
        this.setState({
            currentGame: await Game()
        });
    }

    /**
     * opens join game verification modal
     */
    openVerificationModal() {
        this.setState({ modalDisplay: true });
    }

    /**
     * closes join game verification modal
     */
    async closeVerificationModal() {
        await this.setState({ modalDisplay: false });
        this.renderActionButton();
    }

    /**
     * Leaves the current game and joins the selected game in the state
     */
    async joinDifferentGame() {
        const res = await leaveGame();
        if (res.error) {
            showError(res.error);
            this.setState({
                modalDisplay: false,
            });
            return;
        }

        await joinGame(this.state.selectedGame, { source: this.props.location.pathname });
    }

    /**
     * Gets called when a user tries to join a game.
     * Should make a server call and do the necessary work
     * @param {Game} game 
     */
    handleJoinGame(game) {
        if (!game) return;
        joinGame(game, { byId: true, source: this.props.location.pathname });
    }

    async handleLeaveGame() {
        //TODO: find a way to unmount the gameinfo if a game no longer exists
        const res = await leaveGame();
        if (res.error) {
            showError(res.error);
        } else {
            showSuccess(res.message);
        }

        //TODO: Need a different way to refresh map page
        window.location.reload();
    }

    renderActionButton() {
        let checkInGame = !this.state.currentGame.error;
        let inSomeGame = true;
        if (checkInGame === undefined || !checkInGame) inSomeGame = false;

        const { selectedGame } = this.state,
            username = getLoggedInUserName(),
            isInAnyGame = inSomeGame;

        let actionButton, link = true;
        if (!isInAnyGame) {
            actionButton = <button onClick={() => this.handleJoinGame(selectedGame)} className="btn btn-success">Join Game</button>
        } else if (userInGame(username, selectedGame)) {
            actionButton = <button onClick={this.handleLeaveGame} className="btn btn-danger">Leave Game</button>
            link = false;
        } else {
            actionButton = <button className="btn btn-success" onClick={this.openVerificationModal}> Join Game</button>
            link = false;
        }

        if (link) {
            actionButton = <Link to={`/game`}>{actionButton}</Link>
        }

        actionButton = <div><Router>{actionButton}</Router></div>;

        ReactDOM.render(actionButton, document.getElementById('rsb-map-join-game-window'));
    }

    // Handles the event of a game icon being clicked
    // displays the game info box
    onMarkerClick(props, marker, e) {
        this.setState({
            selectedGame: props.game,
            activeMarker: marker,
            showingInfoWindow: true
        });
        this.renderActionButton();
    }

    // Handles the closing of a game option
    onMapClicked() {
        this.setState({
            showingInfoWindow: false,
            activeMarker: null,
        })
    }

    onAddressSearch(position) {
        this.setState({
            position: position,
            activeMarker: null,
            showingInfoWindow: false
        });
    }

    // Causes a render of new markers by invalidating the map
    async fetchPlaces(mapProps, map) {
        if (!this._isMounted) return;
        const center = map.getCenter();
        console.log(`lat: ${center.lat()} lng: ${center.lng()}`);
        this.setState({
            markers: await this.getMarkers({ lat: center.lat(), lng: center.lng() }),
            showingInfoWindow: false,
            activeMarker: null,
        });
    }

    // Renders the game info window
    renderGameInfoWindow() {
        return <InfoWindow
            onClose={this.onMapClicked}
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}>
            <div>
                <GameInfo {...this.state.selectedGame} />
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
                    {this.state.modalDisplay && <JoinNewGameModal onCancel={this.closeVerificationModal} onJoin={this.joinDifferentGame} />}
                </Map>
            </div>
        );
    }

}

//TODO: return a filtered game to be displayed
const toGame = (game) => game;

/**
 * Returns true a user with {username} is in the {game}
 * @param {String} username 
 * @param {Object} game 
 */
const userInGame = (username, game = { members: [], host: {} }) => {


    if (username === game.host.username) return true;
    if (!game.members) return false;
    for (const member of game.members)
        if (username === member.username) return true;
    return false;
}

export default GoogleApiWrapper({
    apiKey: googleApiKey,
    version: googleApiVersion,
})(MapPage)


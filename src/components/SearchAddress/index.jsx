import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { loadGoogleMaps } from '../../lib/map';

import Loader from '../ui/Loader';

import './style.css';

class SearchAddress extends Component {
    constructor(props) {
        super(props);
        this.state = {
            googleLoaded: !!window.google,
        }

        this.componentDidMount = this.componentDidMount.bind(this);
        this.initMap = this.initMap.bind(this);
    }

    onPlacesChanged = () => {
        if (this.props.onPlacesChanged) {
            this.props.onPlacesChanged(this.searchBox.getPlaces());
        }
    }

    componentDidMount() {
        if (!window.google) {

            loadGoogleMaps().then(() => {
                this.setState({
                    googleLoaded: true,
                });
                this.initMap();

            }).catch((err) => {
                //TODO: handle error
                console.error(err);
            });

        }
    }

    initMap() {
        if (window.google) {
            var input = ReactDOM.findDOMNode(this.refs.rsbSearchBar);
            this.searchBox = new window.google.maps.places.SearchBox(input);
            this.searchBoxListener = this.searchBox.addListener('places_changed', this.onPlacesChanged);
        }
    }

    componentWillUnmount() {
        if (window.google) {
            window.google.maps.event.removeListener(this.searchBoxListener);
        }
    }

    render() {
        if (!this.state.googleLoaded)
            return <Loader height={40} width={40} thickness={3} />;
        return <input className={"form-control " + this.props.className} ref="rsbSearchBar" type="text" placeholder="Search Places" />;
    }

}

export default SearchAddress;

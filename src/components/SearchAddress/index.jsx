import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { loadGoogleMaps, removeGoogleMaps, getAddress } from '../../lib/map';

import Loader from '../ui/Loader';

import './style.css';

class SearchAddress extends Component {
    constructor(props) {
        super(props);
        this.searchInput = "";
        this.state = {
            googleLoaded: !!window.google,
        }

        this.componentDidMount = this.componentDidMount.bind(this);
        this.getAddressInput = this.getAddressInput.bind(this);
        this.initMap = this.initMap.bind(this);
    }

    onPlacesChanged = () => {
        const places = this.searchBox.getPlaces();
        if (places.length === 0) return;

        const position = {
            lat: places[0].geometry.location.lat(),
            lng: places[0].geometry.location.lng(),
        }

        this.props.onPlacesChanged(position);
    }

    componentDidMount() {
        if (window.google) return this.initMap();
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

    async getAddressInput() {
        if (this.props.location && this.props.location.lat){
            const res = await getAddress(this.props.location);
            if(res.error){
                this.searchInput = "";
                return;
            } 
            this.searchInput = res;
        } 

        if (this.searchInput.address) {
            this.searchInput = this.searchInput.address;
        }
    }

    async initMap() {
        if (window.google) {
            await this.getAddressInput();
            var input = ReactDOM.findDOMNode(this.refs.rsbSearchBar);
            input.value = this.searchInput ? this.searchInput : "";
            this.searchBox = new window.google.maps.places.SearchBox(input);
            this.searchBoxListener = this.searchBox.addListener('places_changed', this.onPlacesChanged);
        }
    }

    componentWillUnmount() {
        if (window.google) {
            window.google.maps.event.removeListener(this.searchBoxListener);
            removeGoogleMaps();
        }
    }

    render() {
        if (!this.state.googleLoaded)
            return <Loader height={40} width={40} thickness={3} />;
        return <input className={classnames('form-control', this.props.className)} ref="rsbSearchBar" type="text" placeholder={this.props.placeholder} />;
    }

}

SearchAddress.propTypes = {
    placeholder: PropTypes.string,
    onPlacesChanged: PropTypes.func,
}

SearchAddress.defaultProps = {
    placeholder: 'Enter an address',
    onPlacesChanged: console.log,
}

export default SearchAddress;

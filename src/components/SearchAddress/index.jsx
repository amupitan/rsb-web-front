import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './style.css';

class SearchAddress extends Component {
    static propTypes = {
        placeholder: PropTypes.string,
        onPlacesChanged: PropTypes.func
    }

    onPlacesChanged = () => {
        if (this.props.onPlacesChanged) {
            this.props.onPlacesChanged(this.searchBox.getPlaces());
        }
    }
    componentDidMount() {
        var input = ReactDOM.findDOMNode(this.refs.rsbSearchBar);
        this.searchBox = new window.google.maps.places.SearchBox(input);
        this.searchBoxListener = this.searchBox.addListener('places_changed', this.onPlacesChanged);
    }
    componentWillUnmount() {
        window.google.maps.event.removeListener(this.searchBoxListener);
    }

    render() {
        return <input className="rsb-search-bar form-control" ref="rsbSearchBar" type="text" placeholder="Search Places" />;
    }

}

export default SearchAddress;

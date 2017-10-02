import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

import './style.css';

const style = {
    width: '100%',
    height: '100%',
}

export class MapPage extends Component {
    constructor(props) {
        super(props);
        this.render = this.render.bind(this);
        this.getLocation = this.getLocation.bind(this);
        this.showPosition = this.showPosition.bind(this);
        this.state = {
            latitude: 40,
            longitude: -90
        }
    }
    showPosition(position) {
        this.setState(() => ({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }));
        console.log(this.state);
        this.forceUpdate();
    }
    
    getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.showPosition);
        } 
    }

    render() {
        return (
            <div className="rsb-main-map">
                <Map 
                onReady={this.getLocation()}
                google={this.props.google} 
                style={style}
                zoom={14}
                initialCenter={{
                    lat: this.state.latitude,
                    lng: this.state.longitude
                }}
                
                >

                    <Marker onClick={this.onMarkerClick}
                        name={'Current location'} />

                    <InfoWindow onClose={this.onInfoWindowClose}>
                        <div>
                            <h1>Hello</h1>
                        </div>
                    </InfoWindow>
                </Map>
            </div>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyABplRWPbn89WsMUko7bMI83SXCiWVTHLY'
})(MapPage)


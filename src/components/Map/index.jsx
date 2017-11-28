import React, { Component } from 'react';

import { Notifiable } from "../../mixins";

import WrappedMap from '../MapPage';

import './style.css';

// Renders the wrapped map component
export default class Map extends Notifiable(Component) {
    render() {
        return <WrappedMap {...this.props} updatePage={() => this.forceUpdate()} />;
    }
}


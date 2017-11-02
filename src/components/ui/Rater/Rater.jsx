import React, { Component } from 'react';

import './style.css';

export default class Rater extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rating: this.props.rating
        }
        this.render = this.render.bind(this);
    }

    getStars(numStars, onChange) {
        let stars = []
        for (let i = 0; i < 5; i++) {
            let starColor = (numStars !== 0) ? ((numStars > i) ? "checked" : "") : "unrated";
            stars[i] = (<span key={i} onClick={() => { this.props.onchange(i + 1) }} className={`fa fa-star ${starColor}`}></span>)
        }
        return stars;
    }

    render() {
        return (
            <td>
                {this.getStars(this.props.rating, this.props.onChange)}
            </td>
        )
    }

}

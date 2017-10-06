import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import classnames from 'classnames';

import './style.css';

//TODO: make this stateless
export default class NotFound extends Component {
  // static propTypes = {}
  // static defaultProps = {}
  // state = {}

  render() {
    const { className } = this.props;
    return (
      <div className={classnames('NotFound', className)} >
        <h1>
          404 <small>Not Found :(</small>
        </h1>
      </div>
    );
  }
}
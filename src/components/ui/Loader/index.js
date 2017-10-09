import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './style.css';

const Loader = ({ className, spinnerColor, backColor, secondColor, thirdColor, thickness }) => (
    <div className={classnames(className, 'spinner-loader')} />
);

/* style={{
        'border-top-color': spinnerColor,
        'border-bottom-color': secondColor,
        'border-left-color': thirdColor,
        'border-width': thickness && thickness + 'px',
    }}  */

Loader.defaultProps = {
    thickness: null,
    spinnerColor: null,
    backColor: null,
    secondColor: null,
    thirdColor: null,
};

Loader.propTypes = {
    thickness: PropTypes.number,
    spinnerColor: PropTypes.string,
    backColor: PropTypes.string,
    secondColor: PropTypes.string,
    thirdColor: PropTypes.string,
};

export default Loader;
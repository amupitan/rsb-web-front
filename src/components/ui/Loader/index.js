import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './style.css';

// Spinning loader component
const Loader = ({ className, spinnerColor, backColor, secondColor, thirdColor, thickness, width, height }) => (
    <div className={classnames(className, 'spinner-loader')} style={{
        borderColor: backColor,
        borderTopColor: spinnerColor,
        borderBottomColor: secondColor,
        borderLeftColor: thirdColor,
        borderWidth: thickness + 'px',
        width: width + 'px',
        height: height + 'px',
    }} />
);

// Full page with spinning loader in the middle
export const LoaderPage = (props) => (<div className='full-page-loader' ><Loader {...props} /></div>);

Loader.defaultProps = {
    thickness: 5,
    spinnerColor: '#3498db',
    backColor: '#f3f3f3',
    secondColor: 'f3f3f3',
    thirdColor: 'f3f3f3',
    width: 120,
    height: 120,
};

Loader.propTypes = {
    thickness: PropTypes.number,
    spinnerColor: PropTypes.string,
    backColor: PropTypes.string,
    secondColor: PropTypes.string,
    thirdColor: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
};

export default Loader;
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const Notify = ({ title, message, type, onClose }) => (
    <div className={classnames("alert", `alert-${type}`, "alert-server fade in")} role="alert">
        <button type="button" className="close" data-dismiss="alert" onClick={onClose} >&times;</button>
        <strong>{title && `${title}: `}</strong>{message}
    </div>
);

Notify.defaultProps = {
    type: 'info',
    title: '',
    message: '',
};

Notify.propTypes = {
    title: PropTypes.string,
    message: PropTypes.string,
    type: PropTypes.oneOf(['info', 'success', 'warning', 'danger']),
}
export default Notify;

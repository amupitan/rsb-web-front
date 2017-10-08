import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const Notify = ({ title, text, type }) => (
    <div className={classnames("alert", `alert-${type}`, "alert-server fade in")} role="alert">
        <button type="button" className="close" data-dismiss="alert">&times;</button>
        <strong>{title}</strong>{text}
    </div>
);

Notify.defaultProps = {
    type: 'info',
    title: '',
    text: '',
};

Notify.propTypes = {
    title: PropTypes.string,
    text: PropTypes.string,
    type: PropTypes.oneOf(['info', 'sucess', 'warning', 'danger']),
}
export default Notify;

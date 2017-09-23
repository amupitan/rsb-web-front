import React from 'react';
import './style/HamburgerMenu.css';

function RSBLabel(props) {
    return (
        <div>
            <span onClick={props.onClickFunction} className={props.styleClass}>
                {props.name}
            </span>
        </div>
    )
}

export default RSBLabel;

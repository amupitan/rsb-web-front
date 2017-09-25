import React from 'react';

import './style.css';

var SubmitButton = props => {
    return (
        <div className="form-group col-sm-offset-10">
            <div className="back">
                <div className="button_base b03_skewed_slide_in">
                    <div className="next-button"><span className="glyphicon glyphicon-menu-right"></span>
                    </div>
                    <div></div>
                    <div className="next-button"><span className="glyphicon glyphicon-menu-right"></span><span className="glyphicon glyphicon-menu-right"></span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SubmitButton

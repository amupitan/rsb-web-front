import React from 'react';
import RSBButton from '../ui/RSBButton';


export default ({ username, editMode, onEdit, onSubmit }) => {
    if (editMode) {
        return (
            <div className="row">
                <div className="col-xs-6">
                    <label htmlFor="username" className="form-control-label">Username:</label>
                    {<input type="text" placeholder={username} className="form-control" id="username" onChange={this.handleNameChange} />}
                </div>
                <div className="col-xs-6">
                    <br />
                    <div className="col-xs-6">
                        <RSBButton
                            text="Submit"
                            className="btn btn-info rsb-submit-btn"
                            buttonType="info"
                            onClickFunction={() => { onSubmit() }}
                        />
                    </div>
                    <div className="col-xs-6">
                        <RSBButton
                            text="Cancel"
                            className="btn btn-info rsb-cancel-btn"
                            buttonType="warning"
                            onClickFunction={() => { onEdit(false) }}
                        />
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className="row">
                <div className="col-xs-8">
                    <label htmlFor="username" className="form-control-label">Username:</label><br />
                    <span>{username}</span>
                </div>
                <div className="col-xs-4">
                    <br />
                    <RSBButton
                        text="Edit"
                        className="btn btn-info rsb-edit-btn"
                        buttonType="info"
                        onClickFunction={() => { onEdit(true) }}
                    />
                </div>
            </div>
        )
    }
}
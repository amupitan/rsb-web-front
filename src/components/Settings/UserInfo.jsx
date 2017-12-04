import React from 'react';
import RSBButton from '../ui/RSBButton';


export default ({ formData, editMode, onEdit, onSubmit, updateUserInfo }) => {
    if (editMode) {
        return (
            <div className="panel-body">
                <div className="row">
                    <div className="col-xs-6 ">
                        <h5>Username:</h5>
                        <input type="text" className="form-control" value={formData.username} id="username" onChange={updateUserInfo} ></input> <br />
                        <h5>First name:</h5>
                        <input type="text" className="form-control" value={formData.firstname} id="firstname" onChange={updateUserInfo} ></input> <br />
                        <h5>Last name:</h5>
                        <input type="text" className="form-control" value={formData.lastname} id="lastname" onChange={updateUserInfo} ></input> <br />
                        <h5>Email: </h5>
                        <input type="text" className="form-control" value={formData.email} id="email" onChange={updateUserInfo} ></input> <br />
                        <h5>Password: </h5>
                        <span>Current Password:</span> <br />
                        <input type="password" className="form-control" value={formData.password} id="password" onChange={updateUserInfo} ></input> <br />
                        <span>New Password</span> <br />
                        <input type="password" className="form-control" value={formData.newPassword} id="newPassword" onChange={updateUserInfo} ></input> <br />
                    </div>
                </div >
                <div className="modal-footer">
                    <div className="col-xs-8">
                        <RSBButton
                            text="Submit"
                            className="btn btn-info rsb-submit-btn"
                            buttonType="info"
                            onClickFunction={onSubmit}
                        />
                    </div>
                    <div className="col-xs-4">
                        <RSBButton
                            text="Cancel"
                            className="btn btn-info rsb-cancel-btn"
                            buttonType="danger"
                            onClickFunction={() => { onEdit(false) }}
                        />
                    </div>
                </div>
            </div >
        )
    } else {
        return (
            <div className="panel-body">
                <div className="row">
                    <div className="col-xs-6">
                        <h5>Username:</h5>
                        <span className="form-control rsb-no-edit">{formData.username}</span> <br />
                        <h5>First name:</h5>
                        <span className="form-control rsb-no-edit">{formData.firstname}</span> <br />
                        <h5>Last name:</h5>
                        <span className="form-control rsb-no-edit">{formData.lastname}</span> <br />
                        <h5>Email: </h5>
                        <span className="form-control rsb-no-edit"> </span> <br />
                        <h5>Password: </h5>
                        <span className="form-control rsb-no-edit">***********</span> <br />

                    </div>
                </div>
                <div className="modal-footer">
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
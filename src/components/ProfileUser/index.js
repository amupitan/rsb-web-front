import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import RSBButton from '../ui/RSBButton';

import './style.css';

class ProfileUser extends Component {
    constructor(props){
        super(props);
        this.state={

        }
    }

    render(){
        return (
            <div>
                <div className="modal fade" id={this.state.id} role="dialog">
                    <div className="modal-dialog-full">
                        <div className="modal-content-full">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                                <h4 className="modal-title">Profile</h4>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="form-group">
                                        <label htmlFor="game-code" className="form-control-label">Game Code:</label>
                                        <input type="text" className="form-control" id="game-code" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="game-sport" className="form-control-label">Sport:</label>
                                        <div className="container row">
                                            <div className="col-sm-4">
                                                <RSBButton
                                                    text="Soccer"
                                                    buttonType="info form-control"
                                                    onClickFunction={() => {
                                                        console.log("soccer button clicked")
                                                    }}
                                                />
                                            </div>
                                            <div className="col-sm-4">
                                                <RSBButton
                                                    text="basketball"
                                                    buttonType="info form-control"
                                                    onClickFunction={() => {
                                                        console.log("basketball button clicked")
                                                    }}
                                                />
                                            </div>
                                            <div className="col-sm-4">
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="message-text" className="form-control-label">Message:</label>
                                        <textarea className="form-control" id="message-text"></textarea>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-info" data-dismiss="modal">Submit</button>
                            </div>
                        </div>
                    </div >
                </div >
            </div >
        )
    }
    
}

export default ProfileUser;

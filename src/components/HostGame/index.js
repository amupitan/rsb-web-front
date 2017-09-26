import React, { Component } from 'react';

import './style.css';
import RSBButton from '../ui/RSBButton';

/**
 * Modals are different because we don't have to rerender the page for it to show.
 * 
 * Every modal you use should be visible by the browser at all times
 * 
 * This modal is specifically to host a game
 * 
 */

class HostPage extends Component {
    constructor(prop) {
        super();
        this.state = {
            id: prop.modalID,
            bodyText: prop.bodyText
        }
    }

    render() {
        return (
            <div>

                <div className="modal-header">
                    <RSBButton
                        text="X"
                        onClickFunction={this.props.closeButtonFunction}
                        className="close"
                    />
                    <h4 className="modal-title">Host Game</h4>
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
                    <button type="button" className="btn btn-default" onClick={this.props.closeButtonFunction}>Close</button>
                    <button type="button" className="btn btn-info" >Host</button>
                </div>
            </div>
        );
    }
}

export default HostPage;

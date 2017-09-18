import React, { Component } from 'react';


/**
 * Modals are different because we don't have to rerender the page for it to show.
 * 
 * Every modal you use should be visible by the browser at all times
 * 
 * This modal is an example one... nothing in particular
 * 
 */

class RSBInfoModal extends Component {
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
                <div className="modal fade" id={this.state.id} role="dialog">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                                <h4 className="modal-title">Modal Header</h4>
                            </div>
                            <div className="modal-body">
                                <p>{this.state.bodyText}</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-info" data-dismiss="modal">Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default RSBInfoModal;

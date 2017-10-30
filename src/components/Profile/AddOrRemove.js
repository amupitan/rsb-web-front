import React, { Component } from 'react';

import RSBButton from '../ui/RSBButton';

class AddOrRemove extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUsername: props.currentUsername,
            friendsList: props.friendsList,
            isFriend: false,
        }
    }

    onAddClick() {
        //call for add friend

        this.setState({
            isFriend: true
        });
    }

    onRemoveClick() {
        //call for remove friend

        this.setState({
            isFriend: false
        });
    }

    componentWillMount() {
        console.log(this.state.friendsList);
        for (var i = 0; i < this.state.friendsList.length; ++i) {
            if (this.state.currentUsername === this.state.friendsList[i].username) {
                this.setState({
                    isFriend: true
                });
            }
        }
    }

    render() {
        if (this.state.isFriend) {
            return (
                <div>
                    <RSBButton
                        text="Remove"
                        glyphicons="glyphicon glyphicon glyphicon-minus"
                        onClickFunction={this.onRemoveClick}
                        className="test-hamburger"
                    />
                </div>
            );
        }
        return (
            <div>
                <RSBButton
                    text="Add"
                    glyphicons="glyphicon glyphicon glyphicon-plus"
                    onClickFunction={this.onAddClick}
                    className="test-hamburger"
                />
            </div>
        );
    }

}

export default AddOrRemove;
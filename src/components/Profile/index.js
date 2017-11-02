import React, { Component } from 'react';

<<<<<<< HEAD
import user, { getLoggedInUserName } from '../../lib/user';
import { getGameHistory } from '../../lib/game';
=======
import user, { getLoggedInUserName, uploadProfilePhoto, FriendStatus } from '../../lib/user';
import constraints from '../../lib/constraints';
import { showSuccess } from '../../mixins/notifiable';
>>>>>>> master
import { Notifiable } from '../../mixins';

import { LoaderPage } from '../ui/Loader';
import FriendRequest from './FriendRequest';
import GameInvites from './GameInvites';
import GameHistory from './GameHistory';
import Heading from './Heading';
import FriendsList from './FriendsList';

import './style.css';

class Profile extends Notifiable(Component) {
    constructor(props) {
        super(props);

        this.componentDidMount = this.componentDidMount.bind(this);
        this.getUserInfo = this.getUserInfo.bind(this);
        this.handleChangePhoto = this.handleChangePhoto.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.match.params.username === nextProps.match.params.username) return;
        this.getUserInfo(nextProps.match.params);
    }

    componentDidMount() {
        this.getUserInfo(this.props.match.params);
    }

    async handleChangePhoto(evt) {
        const file = evt.target.files.length > 0 && evt.target.files[0];
        if (!file) return;

        if (file.size > constraints.MAX_FILE_SIZE) {
            this.setState({ errorMessage: `The file size must be under ${constraints.MAX_FILE_SIZE / (1024 * 1024)} MB` });
            return;
        }

        const name = file.name;
        if (!name.endsWith('.png') && !name.endsWith('.jpg') && !name.endsWith('.jpeg')) {
            this.setState({ errorMessage: 'The image must be a .png, ,jpg or .jpeg' });
            return;
        }

        const res = await uploadProfilePhoto(file);
        if (res.error) {
            this.setState({ errorMessage: res.error });
            return;
        }

        showSuccess('Your profile picture was changed successfully');
        this.getUserInfo(this.state.user.username);
    }

    async getUserInfo({ username = getLoggedInUserName() }) {
        const userInfo = await user(username, { populate: 1 });
        if (userInfo.error) {
            // TODO: might want to handle error. It's already handled tho
            return console.error(userInfo);
        }

        const gameHistory = await getGameHistory(username);
        if (gameHistory.error) {
            return console.log(gameHistory);
        }

        this.setState({
            user: userInfo,
            friends: userInfo.friends,
            gameHistory: gameHistory.res,
            errorMessage: null,
        });
    }

    render() {
        if (!this.state || this.state.user == null) return <LoaderPage />;

        const { user, errorMessage } = this.state;
        const isMe = user.friendStatus === FriendStatus.IS_USER;
        return (
            <div className="panel col-xs-10 col-xs-offset-1">
                <Heading onImageChange={isMe && this.handleChangePhoto} {...user} errorMessage={errorMessage} />
                <div className="row">
                    <FriendsList {...this.state} />
                    <GameHistory {...this.state.gameHistory} />
                </div>
                {
                    isMe &&
                    <div className="row">
                        <FriendRequest {...user} />
                        <GameInvites {...user} />
                    </div>
                }
            </div >
        );

    }
}

export default Profile;
import React from 'react';
import { removeFriend, sendFriendRequest, cancelFriendRequest, FriendStatus } from '../../lib/user';

import RSBButton from '../ui/RSBButton';

async function handleUserAction({ username, status }) {
    const action = {
        [FriendStatus.SENT_R]: cancelFriendRequest,
        [FriendStatus.RECEIVED_R]: () => null, //TODO: display option to review
        [FriendStatus.NONE]: sendFriendRequest,
        [FriendStatus.ARE_FRIENDS]: removeFriend,
    }[status];

    return action({ username });
}

export const UserAction = ({ username, status, onClick, onChange }) => {
    const buttonInfo = {
        [FriendStatus.ARE_FRIENDS]: { text: ' Unfriend', buttonType: "danger", glyphicons: "minus" },
        [FriendStatus.SENT_R]: { text: ' Cancel', buttonType: "warning", glyphicons: "time" },
        [FriendStatus.RECEIVED_R]: { text: ' Pending', buttonType: "info", glyphicons: "time" },
        [FriendStatus.NONE]: { text: ' Add', buttonType: "success", glyphicons: "plus" },
        [FriendStatus.IS_USER]: null,
    }[status];

    if (!buttonInfo) return null;

    async function handleClick() {
        onClick(true);
        onChange(await handleUserAction({ username, status }));
    }

    return (
        <div className="text-center rsb-add-or-remove-btn">
            <RSBButton
                text={buttonInfo.text}
                glyphicons={`glyphicon glyphicon-${buttonInfo.glyphicons}`}
                onClickFunction={handleClick}
                buttonType={buttonInfo.buttonType}
            />
        </div>
    );
};

export default UserAction;
import React from 'react';

import './Message.css';

// message param have two child params to be used inside renderer below (in ternary statement)
const Message = ({ message: { user, text }, name }) => {
    // make first check before sending any message by any user
    let isSentByCurUser = false;

    const trimName = name.trim().toLowerCase();

    if (user === trimName) {
        isSentByCurUser = true;
    }

    // ternary statement here
    // pr-10 is padding right 10
    // if it's sent by current user, name of the sender will be placed in top JSX, otherwise it will be placed at bottom JSX
    return (
        isSentByCurUser
            ? (
                <div className="messageContainer justifyEnd">
                    <p className="sentText pr-10">{trimName}</p>
                    <div className="messageBox backgroundBlue">
                        <p className="messageText colorWhite">{text}</p>
                    </div>
                </div>
            )
            : (
                <div className="messageContainer justifyStart">
                    <div className="messageBox backgroundLight">
                        <p className="messageText colorDark">{text}</p>
                    </div>
                    <p className="sentText pl-10">{user}</p>
                </div>
            )
        )
};

export default Message;
import React from 'react';
import iHateEmoji from 'react-emoji';

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
    // if the one message is sent by user, padding will init. first and make chat bubble padded to the right
    // the arrangement is local username (with space letter) then the bubble
    // otherwise, padding will init. lastly and make chat bubble padded to the left
    // the arrangement will be opposite and so do the padding direction
    // using Emojis' Emojify built-in method and pass message text as a probe
    return (
        isSentByCurUser
            ? (
                <div className="messageContainer justifyEnd">
                    <p className="sentText pr-10">{trimName}</p>
                    <div className="messageBox backgroundBlue">
                        <p className="messageText colorWhite">{iHateEmoji.emojify(text)}</p>
                    </div>
                </div>
            )
            : (
                <div className="messageContainer justifyStart">
                    <div className="messageBox backgroundLight">
                        <p className="messageText colorDark">{iHateEmoji.emojify(text)}</p>
                    </div>
                    <p className="sentText pl-10">{user}</p>
                </div>
            )
        )
};

export default Message;
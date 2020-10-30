import React from 'react';

// now using react stb chat module
import ScrollToBottom from 'react-scroll-to-bottom';

import Message from '../Message/Message';

import './Messages.css';

// JSX input code here
// using react-scroll-to-bottom module by wrapping JSX
// send messages params and name into chat blocks
// pinpoint className css that using stb module
const Messages = ({ messages, name }) => (
    <ScrollToBottom className="messages">
        {messages.map((message, i) =>
            <div key={i}>
                <Message
                    message={message}
                    name={name}
                />
            </div>
        )
        }
    </ScrollToBottom>
);

export default Messages;
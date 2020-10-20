import React from 'react';

// now using react stb chat module
import ScrollToBottom from 'react-scroll-to-bottom';

import './Messages.css';

// JSX input code here
// using react-scroll-to-bottom module by wrapping JSX
// send messages params and name into chat blocks
const Messages = ({ messages, name}) => (
    <ScrollToBottom>
        {messages.map((message, i) =>
            <div key={i}>
                <Message
                    message={message}
                    name={name}
                />
            </div>)
        }
    </ScrollToBottom>
);

export default Messages;
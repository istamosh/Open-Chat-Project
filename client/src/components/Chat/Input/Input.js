import React from 'react';
import './Input.css';

// JSX input code here
// make the input as parameters to be passed in Chat.js
// parsing every typed message and when pressed Enter it will trigger Send message function
// Input form containing function for sending message
const Input = ({ setMessage, sendMessage, message }) => (
    <form className="form">
        <input
            className="input"
            type="text"
            placeholder="Type your message..."
            value={message}
            onChange={({ target: { value } }) => setMessage(value)}
            onKeyPress={event => event.key === 'Enter'
                ? sendMessage(event)
                : null
            }
        />
        <button className="sendButton" onClick={event =>
            sendMessage(event)}>Send</button>
    </form>
);

export default Input;
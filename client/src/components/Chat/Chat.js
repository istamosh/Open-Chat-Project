// importing hooks for useEffect = side effect performer
import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import ioClient from 'socket.io-client';

import './Chat.css';

import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import Messages from '../Messages/Messages';

// make empty variable for ioClient
let socket;

// using location probe for parsing purpose
// queryString.parse() is used for parsing the const. data value and inserted in Object variable inside browser Inspect element.
// make socket as endpoint variable
// re-render the queryString using ENDPOINT & location.search inside an array so it will only create one instance of socket connection
// command the socket.io to emit parsed 'name' and 'room' at joining event
const Chat = ({ location }) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');

    const [message, setMessage] = useState(''); // adding useEffect for sent message by user
    const [messages, setMessages] = useState([]); // (plural) adding useEffect for sent messages by user in room across all users

    const ENDPOINT = 'localhost:5000';

    useEffect(() => {
        const { name, room } = queryString.parse(location.search);

        socket = ioClient(ENDPOINT);

        setName(name);
        setRoom(room);

        // emitting join event with name and room params and check for errors and alert about it
        socket.emit('join', { name, room }, (error) => {
            if (error) {
                alert(error);
            }
        });

        return () => { // unmounting, disconnect effect
            socket.emit('disconnect'); // when leaving the chat

            socket.off(); // turn off socket client instance
        }
    }, [ENDPOINT, location.search]);

    // adding useEffect listener from sent message by user in backend section
    useEffect(() => {
        socket.on('message', (message) => {
            setMessages([...messages, message]); // '...' is spreading function and to input in room messages array using submitted user or admin message and then set it
        });
    }, [messages]); // run useEffect messages ONLY when messages array pool is changed.

    // sendMessage event handler/listener from serverside index.js
    // if message useEffect is committed, then emit listened sendMessage event as message event then input it as setMessage val.
    const sendMessage = (event) => {
        event.preventDefault();

        if (message) {
            socket.emit('sendMessage', message, () => setMessage(''));
        }
    }

    // message testing purpose
    console.log(message, messages);

    // JSX chat layout
    // check if Enter key is pressed in keypress activity event
    // passing room property value into InfoBar JSX
    // retrieve passed parameter values from Input.js into input function
    // sends both messages and name property into Messages.js params
    // below /div is the clue: <UserContainer users={users} />
    return (
        <div className="outerContainer">
            <div className="container">
                <InfoBar room={room} />
                <Messages messages={messages} name={name} />
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
            </div>
            
        </div>
    );
}

export default Chat;

// basic Chat boilerplate code passed by App.js
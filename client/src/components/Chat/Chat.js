// importing hooks for useEffect = side effect performer
import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import ioClient from 'socket.io-client';

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
    const ENDPOINT = 'localhost:5000';

    useEffect(() => {
        const { name, room } = queryString.parse(location.search)

        socket = ioClient(ENDPOINT);

        setName(name);
        setRoom(room);

        socket.emit('join', { name, room }, () => {
            
        })

        return () => { // unmounting, disconnect effect
            socket.emit('disconnect'); // when leaving the chat

            socket.off(); // turn off socket client instance

        }

    }, [ENDPOINT, location.search])

    return (
        <h1>Chat</h1>
    )
};

export default Chat;

// basic Chat boilerplate code passed by App.js
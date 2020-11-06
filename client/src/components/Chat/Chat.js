// importing hooks for useEffect = side effect performer
import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import ioClient from "socket.io-client";

import './Chat.css';

import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import Messages from '../Messages/Messages';

import UserContainer from '../UserContainer/UserContainer';

// deployed heroku endpoint
const ENDPOINT = 'https://react-istacord.herokuapp.com/'; 

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
    const [users, setUsers] = useState(''); // not []
    const [message, setMessage] = useState(''); // adding useEffect for sent message by user
    const [messages, setMessages] = useState([]); // (plural) adding useEffect for sent messages by user in room across all users
        
    useEffect(() => {
        const { name, room } = queryString.parse(location.search);

        socket = ioClient(ENDPOINT);

        setRoom(room);
        setName(name);

        // emitting join event with name and room params and check for errors and alert about it
        socket.emit('join', { name, room }, (error) => {
            if (error) {
                alert(error);
            }
        });

    }, [ENDPOINT, location.search]);

    // adding useEffect listener from sent message by user in backend section
    // why empty useEffect parameter? used to be: messages
    // if adding messages, STB will work but lag is occured, w/o messages, STB won't work.
    useEffect(() => {
        socket.on('message', message => {
            setMessages([...messages, message]); // '...' is spreading function and to input in room messages array using submitted user or admin message and then set it
        });
        socket.on('roomData', ({ users }) => { // handles roomData but pick a whole users parent property (inc. name,room,etc. that's why use curly)
            setUsers(users);
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
            <UserContainer users={users} />
        </div>
    );
}

export default Chat;

// basic Chat boilerplate code passed by App.js
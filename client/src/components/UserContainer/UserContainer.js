import React from 'react';
import ioClient from 'socket.io-client';
import ScrollToBottom from 'react-scroll-to-bottom';
import './UserContainer.css';

const UserContainer = ({ users }) => (
    <ScrollToBottom className="userContainer">
        {users.map((user, i) =>
            <div key={i}>
                
            </div>
        }
    </ScrollToBottom>
);

export default UserContainer;

//note for progression
//there is something related to clients' useState callback func.
//and server-side codes
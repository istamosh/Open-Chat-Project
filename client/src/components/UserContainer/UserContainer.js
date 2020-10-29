import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import './UserContainer.css';

const UserContainer = ({ roomData: { room, users } }) => (
    <ScrollToBottom className="userContainer">
        {users.map((user, i) =>
            <div key={i}>
                <div>
                    <h2>{room}</h2>
                </div>
            </div>)
        }
    </ScrollToBottom>
);

export default UserContainer;

//note for progression
//there is something related to clients' useState callback func.
//and server-side codes
//this is wrong (line 5 compile error, room undefined)
import React from 'react';
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
import React from 'react';
import './UsersList.css';
import iconOnline from '../../../icons/iconOnline.png';

const UsersList = ({ users }) => (
    <div className="usersList"> {
        users
            ? (
                <div>
                    <div className="customHeading3">User list in current room:</div>
                    <div className="activeContainer">
                        <h5> {
                            users.map(({ name }) => (
                                <div key={name} className="activeItem">
                                    <img alt="Icon Online" src={iconOnline} />
                                    {name}
                                </div>)
                            )
                        }
                        </h5>
                    </div>
                </div>
            )
            : null
    }
    </div>
);

export default UsersList;
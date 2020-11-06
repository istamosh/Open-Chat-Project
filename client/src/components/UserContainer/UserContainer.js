import React from 'react';
import './UserContainer.css';
import iconOnline from '../../icons/iconOnline.png';

const UserContainer = ({ users }) => (
    <div className="userContainer"> {
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

export default UserContainer;
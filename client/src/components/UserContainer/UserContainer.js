import React from 'react';
import './UserContainer.css';
import iconOnline from '../../icons/iconOnline.png';

const UserContainer = ({ users }) => {
    return (
        <div className="userContainer"> {
            users ?
                (
                    <div>
                        <div className="customHeading3">User list on current room:</div>
                        <div className="activeContainer">
                            <p> {
                                users.map(({ name }) => (
                                    <div key={name} className="activeItem">
                                        <img alt="Icon Online" src={iconOnline} />
                                        {name}
                                    </div>)
                                )
                            }
                            </p>
                        </div>
                    </div>
                )
            : null
        }
        </div>
    );
}

export default UserContainer;

//note for progression
//there is something related to clients' useState callback func.
//and server-side codes
//this is wrong (line 5 compile error, room undefined)
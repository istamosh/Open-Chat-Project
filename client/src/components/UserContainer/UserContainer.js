import React from 'react';
import './UserContainer.css';
import iconOnline from '../../icons/iconOnline.png';

const UserContainer = ({ users }) => {
    return (
        <div className="userContainer"> {
            users ?
                (
                    <div>
                        <h2>User list on current room:</h2>
                        <div className="activeContainer">
                            <h3> {
                                users.map( ({ name }) => (
                                    <div key={name} className="activeItem">
                                        <img alt="Icon Online" src={iconOnline} />
                                        {name}
                                    </div> )
                                )
                            }
                            </h3>
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
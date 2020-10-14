import React, { useState } from 'react'; // importing Reacts' useState hook
import { Link } from 'react-router-dom'; // importing react-router-doms' Link hook


const Join = () => {
    const [name, setName] = useState(''); // empty useState variable that consist of name and setName parameter as name and setName string value to be used on logon screen
    const [room, setRoom] = useState(''); // same as above

    // HTML JSX code to be delivered into App.js
    // mt-20 is margin top 20
    return (
        <div className="joinOuterContainer">
            <div className="joinInnerContainer">
                <h1 className="heading">Join</h1>

                <div><input placeholder="Name" className="joinInput" type="text" onChange={(event) => setName(event.target.value)} /></div>
                <div><input placeholder="Room" className="joinInput mt-20" type="text" onChange={(event) => setRoom(event.target.value)} /></div>

                <Link onClick={event => (!name || !room) ? event.preventDefault() : null} to={`/chat?name=${name}&room=${room}`}>
                    <button className="button mt-20" type="submit">Sign In</button>
                </Link>
            </div>
        </div>
    )
};

export default Join;

// basic Join boilerplate code passed by App.js
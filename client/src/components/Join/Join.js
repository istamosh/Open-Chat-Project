import React, { useState } from 'react'; // importing Reacts' useState hook
import { Link } from "react-router-dom"; // importing react-router-doms' Link hook

// importing .css file into this script
import './Join.css';

// empty useState variable consists of name and setName parameter as name and setName string value to be used on logon screen
// HTML JSX code to be delivered into App.js
// mt-20 is margin top 20
// Link codeblock is rigged with onClick event to prevent app break when user tried to input empty string into both Name and Room boxes
// onChange will change text in the Join boxes as you type your name and room
// if onClick is passed, Link will generate main address depending on users' name and room name input
export default function SignIn() {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');

    return (
        <div className="joinOuterContainer">
            <div className="joinInnerContainer">
                <h1 className="heading">Welcome to Istacord!</h1>

                <div>
                    <input
                        placeholder="Name"
                        className="joinInput"
                        type="text"
                        onChange={(event) =>
                            setName(event.target.value)} />
                </div>

                <div>
                    <input
                        placeholder="Room"
                        className="joinInput mt-20"
                        type="text"
                        onChange={(event) =>
                            setRoom(event.target.value)} />
                </div>

                <Link onClick={event => (!name || !room)
                    ? event.preventDefault()
                    : null
                } to={`/chat?name=${name}&room=${room}`}>
                    <button className={'button mt-20'} type="submit">Sign In</button>
                </Link>
            </div>
        </div>
    );
}
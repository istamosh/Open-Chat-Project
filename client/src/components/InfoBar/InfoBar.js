import React from 'react';
import './InfoBar.css';

// importing necessary icons for JSX below
import iconClose from '../../icons/iconClose.png';
import iconOnline from '../../icons/iconOnline.png';

// JSX header code here
// refresh page function
// needs icon image to be put inside /src/icons
// receive room value params. from Chat.js so it can be a dynamic room name header
// using parentheses instead of curly brackets, just for returning purpose
const InfoBar = ({ room }) => (
    <div className="infoBar">
        <div className="leftInnerContainer">
            <img className="onlineIcon" src={iconOnline} alt="online image" />
            <h3>{room}</h3>
        </div>
        <div className="rightInnerContainer">
            <a href="/"><img src={iconClose} alt="close image" /></a>
        </div>
    </div>
);

export default InfoBar;
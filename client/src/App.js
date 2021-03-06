import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// prevent app from breaking upon launch
import Join from './components/Join/Join';
import Chat from './components/Chat/Chat';

// greets user with Join components and pass the inputted datas from login screen into desired folder/script and Chat section
const App = () => {
    return (
        <Router>
            <Route path="/" exact component={Join} />
            <Route path="/chat" component={Chat} />
        </Router>
    );
}

export default App;
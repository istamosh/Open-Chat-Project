//#region Basic React Boilerplate Code
import React from 'react';
import ReactDOM from 'react-dom';

// every Reacts' file will be put inside App folder
import App from './App'

// and inject/import all the created code inside index.html's root section (index.html is inside public folder)
ReactDOM.render(<App />, document.querySelector('#root'));
//#endregion
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';  // optional, if you have custom styles
import App from './App';  // importing the App component

// Render the App component into the root element in the index.html file
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

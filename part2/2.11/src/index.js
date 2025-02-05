import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';  // Optional, if you want to include CSS
import App from './App';  // Assuming you have an App component

// Render the App component into the root element in the index.html file
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

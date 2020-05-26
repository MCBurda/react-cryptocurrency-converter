import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// This is where the React app starts. We are attaching the React app to the "root" ID element of the DOM and rendering it.
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);



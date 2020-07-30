import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider as AlertProvider } from 'react-alert'
import AlertTemplate from './Components/react-alert-template-basic'
const options = {
  position: 'bottom center',
  timeout: 3000,
  offset: '5px',
  containerStyle: {
    zIndex: 10000000000
  },
  transition: 'fade'
}
ReactDOM.render(
  <AlertProvider template={AlertTemplate} {...options}>
    <App />
  </AlertProvider>,
  document.getElementById('root')
);



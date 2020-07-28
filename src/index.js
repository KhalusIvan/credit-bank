import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
const options = {
  position: 'bottom center',
  timeout: 3000,
  offset: '5px',
  transition: 'fade'
}
ReactDOM.render(
  <AlertProvider template={AlertTemplate} {...options}>
    <App />
  </AlertProvider>,
  document.getElementById('root')
);



import React from 'react';
import { render } from 'react-dom';
import App from './App.jsx';
import './styles/main.scss';

render(
  <div id='app'>
    <App />
  </div>,
  document.getElementById('contents')
);

// dependencies
import React from 'react';
import { render } from 'react-dom';

// local dependencies
import App from './components/App/App';
import './styles/main.scss';

render(
  <App />,
  document.getElementById('todos-app')
);
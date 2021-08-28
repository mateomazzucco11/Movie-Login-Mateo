import React from 'react';
import ReactDOM from 'react-dom';

import { MoviesApp } from './MoviesApp';
import './styles/styles.scss';

ReactDOM.render(
  <React.StrictMode>
    <MoviesApp />
  </React.StrictMode>,
  document.getElementById('root')
);
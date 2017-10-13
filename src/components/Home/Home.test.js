import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import Home from './';

it('renders without crashing', () => {
  const div = document.createElement('div');

  try {
    ReactDOM.render(
      <BrowserRouter >
        <Home />
      </BrowserRouter>, div);
  } catch (err) {
    if (err.code !== 'NOTNOTIFIABLE') throw err;
  }
});

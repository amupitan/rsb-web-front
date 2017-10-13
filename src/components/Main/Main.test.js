import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import Main from './';

it('renders without crashing', () => {
  const div = document.createElement('div');
  try {
    ReactDOM.render(
      <BrowserRouter >
        <Main />
      </BrowserRouter>, div);
  } catch (err) {
    if (err.code !== 'NOTNOTIFIABLE') throw err;
  }
});

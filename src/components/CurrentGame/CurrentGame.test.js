import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import CurrentGame from './';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const notify = { show: () => { }, hide: () => { } };

  ReactDOM.render(
    <BrowserRouter >
      <CurrentGame notify={notify} />
    </BrowserRouter>, div);
}); 

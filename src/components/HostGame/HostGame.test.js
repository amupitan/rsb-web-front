import React from 'react';
import ReactDOM from 'react-dom';
import HostGame from './';
import { BrowserRouter } from 'react-router-dom';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const notify = { show: () => { }, hide: () => { } };

  ReactDOM.render(
    <BrowserRouter >
      <HostGame closeButtonFunction={() => { }} notify={notify} />
    </BrowserRouter>, div);
});


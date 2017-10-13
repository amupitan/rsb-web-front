import React from 'react';
import ReactDOM from 'react-dom';
import HostGame from './';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const notify = { show: () => { }, hide: () => { } };
  ReactDOM.render(<HostGame closeButtonFunction={() => { }} notify={notify} />, div);
});

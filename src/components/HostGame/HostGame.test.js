import React from 'react';
import ReactDOM from 'react-dom';
import HostGame from './';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<HostGame />, div);
});

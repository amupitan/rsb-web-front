import React from 'react';
import ReactDOM from 'react-dom';
import GameHistory from './';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const notify = { show: () => { }, hide: () => { } };
  ReactDOM.render(<GameHistory notify={notify} />, div);
}); 

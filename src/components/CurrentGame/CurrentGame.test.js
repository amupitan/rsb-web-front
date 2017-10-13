import React from 'react';
import ReactDOM from 'react-dom';
import CurrentGame from './';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const notify = { show: () => { }, hide: () => { } };
  ReactDOM.render(<CurrentGame notify={notify} />, div);
}); 

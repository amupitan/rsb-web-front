import React from 'react';
import ReactDOM from 'react-dom';
import Friends from './';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const notify = { show: () => { }, hide: () => { } };
  ReactDOM.render(<Friends notify={notify} />, div);
}); 

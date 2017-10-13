import React from 'react';
import ReactDOM from 'react-dom';
import Join from './';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const notify = { show: () => { }, hide: () => { } };
  ReactDOM.render(<Join notify={notify} />, div);
}); 

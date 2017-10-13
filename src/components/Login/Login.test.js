import React from 'react';
import ReactDOM from 'react-dom';
import Login from './';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const notify = { show: () => { }, hide: () => { } };
  ReactDOM.render(<Login notify={notify} />, div);
}); 

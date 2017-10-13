import React from 'react';
import ReactDOM from 'react-dom';
import SignUp from './';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const notify = { show: () => { }, hide: () => { } };
  ReactDOM.render(<SignUp notify={notify} />, div);
}); 

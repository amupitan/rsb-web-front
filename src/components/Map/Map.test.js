import React from 'react';
import ReactDOM from 'react-dom';
import Map from './';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const notify = { show: () => { }, hide: () => { } };
  ReactDOM.render(<Map notify={notify} />, div);
}); 
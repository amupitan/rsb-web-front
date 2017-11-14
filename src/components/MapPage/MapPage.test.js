import React from 'react';
import ReactDOM from 'react-dom';
import MapPage from './';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MapPage />, div);
}); 

import React from 'react';
import ReactDOM from 'react-dom';
import CurrentGame from './';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CurrentGame />, div);
}); 

import React from 'react';
import ReactDOM from 'react-dom';
import Currentgame from './';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Currentgame />, div);
}); 

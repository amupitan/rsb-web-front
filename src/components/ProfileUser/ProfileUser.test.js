import React from 'react';
import ReactDOM from 'react-dom';
import ProfileUser from './';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ProfileUser onCloseFunction={()=>{}} />, div);
}); 

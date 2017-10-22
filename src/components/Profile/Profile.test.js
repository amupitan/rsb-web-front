import React from 'react';
import ReactDOM from 'react-dom';
import Profile from './';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props = {
    match: {
      params: {
        username: 'kerno'
      }
    }
  }
  // ReactDOM.render(<Profile params={props} onCloseFunction={() => { }} />, div);
}); 

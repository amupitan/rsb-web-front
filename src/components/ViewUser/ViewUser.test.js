import React from 'react';
import ReactDOM from 'react-dom';
import ViewUser from './';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ViewUser />, div);
}); 

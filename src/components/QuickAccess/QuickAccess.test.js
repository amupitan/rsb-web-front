import React from 'react';
import ReactDOM from 'react-dom';
import QuickAccess from './';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<QuickAccess content={[]} />, div);
});

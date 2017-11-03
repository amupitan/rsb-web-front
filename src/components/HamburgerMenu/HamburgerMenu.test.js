import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import HamburgerMenu from './';


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(

    <BrowserRouter >
      <HamburgerMenu menu />
    </BrowserRouter>, div);

});

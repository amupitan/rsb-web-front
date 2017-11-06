import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

import GameHistory from './';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const notify = { show: () => { }, hide: () => { } };

  ReactDOM.render(
    <BrowserRouter>
      <Route path='/history/:username' render={(props) => <GameHistory {...props} notify={notify} onCloseFunction={() => { }} />} />
    </BrowserRouter>, div);
}); 

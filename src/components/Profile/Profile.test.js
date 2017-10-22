import React from 'react';
import ReactDOM from 'react-dom';
import Profile from './';
import { BrowserRouter, Route } from 'react-router-dom';


it('renders without crashing', () => {
  const div = document.createElement('div');
  const notify = { show: () => { }, hide: () => { } };

  ReactDOM.render(
    <BrowserRouter>
      <Route path='/user/:username' render={(props) => <Profile {...props} notify={notify} onCloseFunction={() => { }} />} />
    </BrowserRouter>, div);
}); 

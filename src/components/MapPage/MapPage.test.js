import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import MapPage from './';


it('renders without crashing', () => {
  const div = document.createElement('div');
  const notify = { show: () => { }, hide: () => { } };

  ReactDOM.render(
    <BrowserRouter>
      <Route path='map' render={(props) => <MapPage {...props} notify={notify} onCloseFunction={() => { }} />} />
    </BrowserRouter>, div);
}); 

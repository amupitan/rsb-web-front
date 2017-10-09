import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';

import history from './lib/navigator/history';

import App from './components/App';


ReactDOM.render((
  <Router history={history} >
    <App />
  </Router>
), document.getElementById('root'));

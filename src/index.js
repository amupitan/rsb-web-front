import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';

import App from './components/App';
import history from './components/App/history';

ReactDOM.render((
  <Router history={history} >
    <App />
  </Router>
), document.getElementById('root'));

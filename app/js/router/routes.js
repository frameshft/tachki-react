import React from 'react';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';

import Application from '../components/Application.jsx';
import Companies from '../components/companies/Index.jsx';

export default (store) => {
  const history = syncHistoryWithStore(browserHistory, store);

  return (
    <Router history={history}>
      <Route path="/" component={ Application }>
        <IndexRoute components={{main: Companies}}/>
      </Route>
      <Route path="companies" component={ Companies }/>
    </Router>
  );
};

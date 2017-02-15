import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import Application from './components/application';
import CompanyList from './components/companies/companies.list';
import CarList from './components/cars/cars.list';

export default (store) => {
  const history = syncHistoryWithStore(browserHistory, store);

  return (
    <Router history={ history }>
      <Route path='/' component={ Application }>
        <IndexRoute component={ CompanyList } />
        <Route path='companies' component={ CompanyList } />
        <Route path='cars' component={ CarList } />
      </Route>
    </Router>
  );
};

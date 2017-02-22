import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import Application from './components/application';
import Auth from './components/auth/auth';
import CompanyList from './components/companies/companies.list';
import CarList from './components/cars/cars.list';
import PartsList from './components/spare-parts/parts.list';
import CompanyProfile from './components/companies/company.profile';

export default (store) => {
  const history = syncHistoryWithStore(browserHistory, store);

  return (
    <Router history={ history }>
      <Route path='/' component={ Application }>
        <IndexRoute component={ CompanyList } />
        <Route path='sign-in' component={ Auth } />
        <Route path='companies' component={ CompanyList } />
        <Route path='companies/:companyId' components={ CompanyProfile } />
        <Route path='cars' component={ CarList } />
        <Route path='spare-parts' component={ PartsList } />
      </Route>
    </Router>
  );
};

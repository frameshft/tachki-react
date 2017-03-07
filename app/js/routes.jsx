import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import Application from './components/application';
import AuthComponents from './components/auth';
import CompanyList from './components/companies/companies.list';
import CarList from './components/cars/cars.list';
import PartsList from './components/spare-parts/parts.list';
import ServicesList from './components/services/services.list';
import CompanyProfile from './components/companies/company.profile';
import CarProfile from './components/cars/car.profile';
import UpPost from './components/shared/up.post';

export default (store) => {
  const history = syncHistoryWithStore(browserHistory, store);

  return (
    <Router history={ history }>
      <Route path='/' component={ Application }>
        <IndexRoute component={ CompanyList } />
        <Route path='sign-in' component={ AuthComponents.SignIn } />
        <Route path='registration' component={ AuthComponents.Registration } />
        <Route path='forgot-password' component={ AuthComponents.ForgotPassword } />
        <Route path='companies' component={ CompanyList } />
        <Route path='companies/:id' components={ CompanyProfile } />
        <Route path='automobiles' component={ CarList } />
        <Route path='automobiles/:id' components={ CarProfile } />
        <Route path='spare-parts' component={ PartsList } />
        <Route path='services' component={ ServicesList } />
        <Route path='my/posts' component={ AuthComponents.MyPostsList } />
        <Route path='my/favorites' component={ AuthComponents.FavoritePosts } />
        <Route path='my/history' component={ AuthComponents.HistoryPosts } />
        <Route path='up/:id' component={ UpPost } />
      </Route>
    </Router>
  );
};

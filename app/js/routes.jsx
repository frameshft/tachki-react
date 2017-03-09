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
import HeaderControls from './constants/header.controls';

export default (store) => {
  const history = syncHistoryWithStore(browserHistory, store);

  return (
    <Router history={ history }>
      <Route path='/' component={ Application }>
        <IndexRoute
          component={ CompanyList }
          title='Компании' controls={ HeaderControls.COMPANIES }
        />
        <Route path='sign-in' component={ AuthComponents.SignIn } title='Войти' />
        <Route path='registration' component={ AuthComponents.Registration } title='Регистрация' />
        <Route
          path='forgot-password'
          component={ AuthComponents.ForgotPassword } title='Восстановление пароля'
        />
        <Route
          path='companies'
          component={ CompanyList } title='Компании' controls={ HeaderControls.COMPANIES }
        />
        <Route
          path='companies/:id'
          components={ CompanyProfile } title='О компании'
        />
        <Route
          path='automobiles'
          component={ CarList } title='Автомобили' controls={ HeaderControls.POSTS }
        />
        <Route
          path='automobiles/:id'
          components={ CarProfile } title='Объявление' controls={ HeaderControls.POST_DETAIL }
        />
        <Route
          path='spare-parts'
          component={ PartsList } title='Запчасти' controls={ HeaderControls.POSTS }
        />
        <Route
          path='services'
          component={ ServicesList } title='Услуги' controls={ HeaderControls.POSTS }
        />
        <Route
          path='my/posts'
          component={ AuthComponents.MyPostsList }
          title='Мои объявления' controls={ HeaderControls.POSTS }
        />
        <Route
          path='my/favorites'
          component={ AuthComponents.FavoritePosts }
          title='Сохраненные' controls={ HeaderControls.POSTS }
        />
        <Route
          path='my/history'
          component={ AuthComponents.HistoryPosts }
          title='Просмотренные' controls={ HeaderControls.POSTS }
        />
        <Route path='up/:id' component={ UpPost } title='Поднять объявление' />
      </Route>
    </Router>
  );
};

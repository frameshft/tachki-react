import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import Application from './components/application';
import Frontpage from './components/frontpage';
import AuthComponents from './components/auth';
import CompanyList from './components/companies/companies.list';
import CompanySearch from './components/companies/companies.search';
import CarList from './components/cars/cars.list';
import CargoList from './components/cargo/cargos';
import CargoProfile from './components/cargo/cargo.profile';
import PartsList from './components/spare-parts/parts.list';
import ServicesList from './components/services/services.list';
import CompanyProfile from './components/companies/company.profile';
import CarProfile from './components/cars/car.profile';
import PartProfile from './components/spare-parts/part.profile';
import ServiceProfile from './components/services/services.profile';
import ServicesSearch from './components/services/services.search';
import CarSearch from './components/cars/car.search';
import UpPost from './components/shared/up.post';
import CommentsPost from './components/shared/comments.post';
import HeaderControls from './constants/header.controls';
import Agreement from './components/static-pages/agreement';
import FAQ from './components/static-pages/faq';

export default (store) => {
  const history = syncHistoryWithStore(browserHistory, store);

  return (
    <Router history={ history }>
      <Route path='/' component={ Application }>
        <IndexRoute
          component={ Frontpage }
          title='Главная'
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
          path='companies/search'
          component={ CompanySearch } title='Поиск'
        />
        <Route
          path='companies/:id'
          components={ CompanyProfile } title='О компании'
        />
        <Route
          path='automobiles/search'
          components={ CarSearch } title='Поиск'
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
          path='spare-parts/:id'
          components={ PartProfile } title='Запчасти' controls={ HeaderControls.POST_DETAIL }
        />
        <Route
          path='services'
          component={ ServicesList } title='Услуги' controls={ HeaderControls.POSTS }
        />
        <Route
          path='services/search'
          components={ ServicesSearch } title='Поиск'
        />
        <Route
          path='services/:id'
          component={ ServiceProfile } title='Услуги' controls={ HeaderControls.POSTS }
        />
        <Route
          path='cargo'
          component={ CargoList } title='Грузовые' controls={ HeaderControls.POSTS }
        />
        <Route
          path='cargo/:id'
          component={ CargoProfile } title='Грузовые' controls={ HeaderControls.POSTS }
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
        <Route path='comments/:id' component={ CommentsPost } title='Комментарии' />
        <Route path='agreement' component={ Agreement } title='Пользовательское соглашение' />
        <Route path='faq' component={ FAQ } title='Правила/Помощь' />
      </Route>
    </Router>
  );
};

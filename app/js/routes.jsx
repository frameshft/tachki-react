import React from 'react';
import { Router, Route, IndexRoute, browserHistory, Redirect } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import Application from './components/application';
import Frontpage from './components/frontpage';
import AuthComponents from './components/auth';
import CargoProfile from './components/cargo/cargo.profile';
import CompanyProfile from './components/companies/company.profile';
import CarProfile from './components/cars/car.profile';
import PartProfile from './components/spare-parts/part.profile';
import ServiceProfile from './components/services/services.profile';
import UpPost from './components/shared/up.post';
import CommentsPost from './components/shared/comments.post';
import HeaderControls from './constants/header.controls';
import Agreement from './components/static-pages/agreement';
import FAQ from './components/static-pages/faq';
import PostsList from './components/shared/posts.list';
import PageNotFound from './components/shared/PageNotFound';

export default (store) => {
  const history = syncHistoryWithStore(browserHistory, store);

  return (
    <Router onUpdate={ () => window.scrollTo(0, 0) } history={ history }>
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
          component={ PostsList } title='Компании' controls={ HeaderControls.COMPANIES }
          postType='companies'
        />
        <Route
          path='companies/:id'
          components={ CompanyProfile } title='О компании'
        />
        <Route
          path='automobiles'
          component={ PostsList } title='Автомобили' controls={ HeaderControls.POSTS }
          postType='automobiles'
        />
        <Route
          path='automobiles/:brand-:model-:id'
          components={ CarProfile } title='Объявление' controls={ HeaderControls.POST_DETAIL }
        />
        <Route
          path='automobiles/:category/:brand'
          component={ PostsList } title='Автомобили' controls={ HeaderControls.POSTS }
          postType='automobiles'
        />
        <Route
          path='automobiles/:category'
          component={ PostsList } title='Автомобили' controls={ HeaderControls.POSTS }
          postType='automobiles'
        />
        <Route
          path='automobiles'
          component={ PostsList } title='Автомобили' controls={ HeaderControls.POSTS }
          postType='automobiles'
        />
        <Route
          path='posts'
          component={ PostsList } title='Посты' controls={ HeaderControls.POSTS }
          postType='cargos'
        />
        <Route
          path='spare-parts'
          component={ PostsList } title='Запчасти' controls={ HeaderControls.POSTS }
          postType='spareParts'
        />
        <Route
          path='spare-parts/:category'
          component={ PostsList } title='Запчасти' controls={ HeaderControls.POSTS }
          postType='spareParts'
        />
        <Route
          path='spare-parts/:category/:id'
          components={ PartProfile } title='Запчасти' controls={ HeaderControls.POST_DETAIL }
        />
        <Route
          path='services'
          component={ PostsList } title='Услуги' controls={ HeaderControls.POSTS }
          postType='services'
        />
        <Route
          path='services/:category'
          component={ PostsList } title='Услуги' controls={ HeaderControls.POSTS }
          postType='services'
        />
        <Route
          path='services/:category/:id'
          component={ ServiceProfile } title='Услуги' controls={ HeaderControls.POSTS }
        />
        <Route
          path='cargo'
          component={ PostsList } title='Грузовые' controls={ HeaderControls.POSTS }
          postType='cargos'
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
        <Route path='404' component={ PageNotFound } title='Ошибка' />
        <Redirect from='*' to='404' />
      </Route>
    </Router>
  );
};

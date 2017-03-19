/* eslint-disable global-require */
import React from 'react';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import store from '../../store';
import * as AuthActions from '../../actions/auth';

class Sidebar extends React.Component {
  constructor(props) {
    super(props);

    this.onToggleSidebar = this.onToggleSidebar.bind(this);
    this.onSignoutClick = this.onSignoutClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { auth } = this.props;
    const user = auth.user;
    if (user.token !== nextProps.auth.user.token && nextProps.auth.user.token === undefined) {
      browserHistory.push('/companies ');
    }
  }

  onToggleSidebar() {
    this.props.toggle();
  }

  onSignoutClick() {
    this.props.toggle();
    store.dispatch(AuthActions.signOut());
  }

  renderAnonymous() {
    return (
      <div className='sidebar'>
        <div className='sidebar__profile' />
        <ul className='sidebar__navigation'>
          <li className='sidebar__navigation__item sidebar__navigation__item--main desktop'>
            <a href='/' className='sidebar__navigation__link'>Главная</a>
          </li>
          <li className='sidebar__navigation__item sidebar__navigation__item--viewed'>
            <Link
              to='/my/history' className='sidebar__navigation__link'
              onClick={ this.onToggleSidebar }
            >
              Просмотренные
            </Link>
          </li>
          <li className='sidebar__navigation__item sidebar__navigation__item--settings'>
            <a href='/' className='sidebar__navigation__link'>Настройки</a>
          </li>
          <li className='sidebar__navigation__item sidebar__navigation__item--recommend'>
            <a href='/' className='sidebar__navigation__link'>Рекомендовать</a>
          </li>
          <li className='sidebar__navigation__item sidebar__navigation__item--recommend'>
            <Link
              to='/registration'
              className='sidebar__navigation__link' onClick={ this.onToggleSidebar }
            >
              Регистрация
            </Link>
          </li>
          <li className='sidebar__navigation__item sidebar__navigation__item--recommend'>
            <Link
              to='/sign-in'
              className='sidebar__navigation__link' onClick={ this.onToggleSidebar }
            >
              Войти
            </Link>
          </li>
        </ul>
      </div>
    );
  }

  renderAuthorized(user) {
    return (
      <div className='sidebar'>
        <div className='sidebar__profile'>
          <div className='sidebar__profile__media'>
            <img
              className='sidebar__profile__media__img' src={ user.image } alt={ user.username }
            />
          </div>
          <div className='sidebar__profile__title'>
            { user.username }
          </div>
          <div className='sidebar__profile__balance'>
            Баланс: { user.balance }
          </div>
        </div>
        <ul className='sidebar__navigation'>
          <li className='sidebar__navigation__item sidebar__navigation__item--main desktop'>
            <a href='/' className='sidebar__navigation__link'>Главная</a>
          </li>
          <li className='sidebar__navigation__item sidebar__navigation__item--create'>
            <a href='/' className='sidebar__navigation__link'>Оформить объявление</a>
          </li>
          <li className='sidebar__navigation__item sidebar__navigation__item--my'>
            <Link
              to='/my/posts'
              className='sidebar__navigation__link' onClick={ this.onToggleSidebar }
            >
              Мои объявления
            </Link>
          </li>
          <li className='sidebar__navigation__item sidebar__navigation__item--messages'>
            <a href='/' className='sidebar__navigation__link'>Сообщения</a>
          </li>
          <li className='sidebar__navigation__item sidebar__navigation__item--saved'>
            <Link
              to='/my/favorites'
              className='sidebar__navigation__link' onClick={ this.onToggleSidebar }
            >
              Сохраненные
            </Link>
          </li>
          <li className='sidebar__navigation__item sidebar__navigation__item--viewed'>
            <Link
              to='/my/history' className='sidebar__navigation__link'
              onClick={ this.onToggleSidebar }
            >
              Просмотренные
            </Link>
          </li>
          <li className='sidebar__navigation__item sidebar__navigation__item--settings'>
            <a href='/' className='sidebar__navigation__link'>Настройки</a>
          </li>
          <li className='sidebar__navigation__item sidebar__navigation__item--recommend'>
            <a href='/' className='sidebar__navigation__link'>Рекомендовать</a>
          </li>
          <li className='sidebar__navigation__item sidebar__navigation__item--signout'>
            {/* FIXME: replace logout with btn */}
            <button
              className='sidebar__navigation__link button__transparent'
              onClick={ this.onSignoutClick }
            >
              Выйти
            </button>
          </li>
        </ul>
      </div>
    );
  }

  render() {
    const { auth } = this.props;
    const user = auth.user;
    return (user.token !== undefined) ? this.renderAuthorized(user) : this.renderAnonymous();
  }
}

Sidebar.propTypes = {
  auth: React.PropTypes.object.isRequired,
  toggle: React.PropTypes.func,
};

function mapToProps(state) {
  const auth = state.auth;

  return {
    auth,
  };
}

export default connect(mapToProps)(Sidebar);

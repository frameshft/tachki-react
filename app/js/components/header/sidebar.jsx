/* eslint-disable global-require */
import React from 'react';
import Swipeable from 'react-swipeable';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import store from '../../store';
import * as AuthActions from '../../actions/auth';

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.onSignoutClick = this.onSignoutClick.bind(this);
    this.onClick = this.onClick.bind(this);
    this.swiping = this.swiping.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { auth } = this.props;
    const user = auth.user;
    if (user.token !== nextProps.auth.user.token && nextProps.auth.user.token === undefined) {
      browserHistory.push('/companies ');
    }
  }

  onSignoutClick() {
    if (this.props.toggle) {
      this.props.toggle();
    }
    store.dispatch(AuthActions.signOut());
  }

  onClick() {
    if (this.props.isDesktop) {
      this.props.close();
    }
  }

  swiping() {
    this.props.onclose();
  }

  renderAnonymous() {
    return (
      <Swipeable className='sidebar' onSwipingLeft={ this.swiping }>
        <ul className='sidebar__navigation' onClick={ this.onClick }>
          <li className='sidebar__navigation__item sidebar__navigation__item--main desktop'>
            <a href='/' className='sidebar__navigation__link'>Главная</a>
          </li>
          <li className='sidebar__navigation__item sidebar__navigation__item--viewed'>
            <Link to='/my/history' className='sidebar__navigation__link' activeClassName='sidebar__navigation__link--active'>
              Просмотренные
            </Link>
          </li>
          {/* <li className='sidebar__navigation__item sidebar__navigation__item--settings'> */}
          {/* <a href='/' className='sidebar__navigation__link'>Настройки</a> */}
          {/* </li> */}
          {/* <li className='sidebar__navigation__item sidebar__navigation__item--recommend'>
            <a href='/' className='sidebar__navigation__link'>Рекомендовать</a>
          </li> */}
          <li className='sidebar__navigation__item sidebar__navigation__item--recommend'>
            <Link to='/registration' className='sidebar__navigation__link' activeClassName='sidebar__navigation__link--active'>
              Регистрация
            </Link>
          </li>
          <li className='sidebar__navigation__item sidebar__navigation__item--recommend'>
            <Link to='/sign-in' className='sidebar__navigation__link' activeClassName='sidebar__navigation__link--active'>
              Войти
            </Link>
          </li>
        </ul>
      </Swipeable>
    );
  }

  renderAuthorized(user) {
    return (
      <Swipeable className='sidebar' onSwipingLeft={ this.swiping }>
        <div className='sidebar__profile' onClick={ this.onClick }>
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
        <ul className='sidebar__navigation' onClick={ this.onClick }>
          <li className='sidebar__navigation__item sidebar__navigation__item--main desktop'>
            <Link to='/' className='sidebar__navigation__link' activeClassName='sidebar__navigation__link--active'>Главная</Link>
          </li>
          {/* TODO: uncomment after component is ready */}
          {/* <li className='sidebar__navigation__item sidebar__navigation__item--create'> */}
          {/* <a href='/' className='sidebar__navigation__link'>Оформить объявление</a> */}
          {/* </li> */}
          <li className='sidebar__navigation__item sidebar__navigation__item--my'>
            <Link to='/my/posts' className='sidebar__navigation__link' activeClassName='sidebar__navigation__link--active'>
              Мои объявления
            </Link>
          </li>
          {/* <li className='sidebar__navigation__item sidebar__navigation__item--messages'>
            <a href='/' className='sidebar__navigation__link'>Сообщения</a>
          </li> */}
          <li className='sidebar__navigation__item sidebar__navigation__item--saved'>
            <Link to='/my/favorites' className='sidebar__navigation__link' activeClassName='sidebar__navigation__link--active'>
              Сохраненные
            </Link>
          </li>
          <li className='sidebar__navigation__item sidebar__navigation__item--viewed'>
            <Link to='/my/history' className='sidebar__navigation__link' activeClassName='sidebar__navigation__link--active'>
              Просмотренные
            </Link>
          </li>
          { /* <li className='sidebar__navigation__item sidebar__navigation__item--settings'> */ }
          {/* <a href='/' className='sidebar__navigation__link'>Настройки</a> */}
          { /* </li> */ }
          { /* <li className='sidebar__navigation__item sidebar__navigation__item--recommend'>
            <a href='/' className='sidebar__navigation__link'>Рекомендовать</a>
          </li> */ }
          <li className='sidebar__navigation__item sidebar__navigation__item--signout'>
            <button
              className='sidebar__navigation__link button__transparent'
              onClick={ this.onSignoutClick }
            >Выйти</button>
          </li>
        </ul>
      </Swipeable>
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
  close: React.PropTypes.func,
  isDesktop: React.PropTypes.bool,
};

Sidebar.defaultProps = {
  close: null,
  isDesktop: false,
};

function mapToProps(state) {
  const auth = state.auth;

  return {
    auth,
  };
}

export default connect(mapToProps)(Sidebar);

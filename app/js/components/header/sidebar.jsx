/* eslint-disable global-require */
import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

class Sidebar extends React.Component {
  constructor(props) {
    super(props);

    this.onToggleSidebar = this.onToggleSidebar.bind(this);
  }

  onToggleSidebar() {
    this.props.toggle();
  }


  render() {
    const { auth } = this.props;
    const user = auth.user;
    const loggedIn = (user.token !== undefined);

    let username;
    let balance;
    let img;

    if (loggedIn) {
      username = user.name;
      balance = user.balance;
      img = user.image;
    }

    return (
      <div className='sidebar'>
        <div className='sidebar__profile'>
          {loggedIn && <div>
            <div className='sidebar__profile__media'>
              <img className='sidebar__profile__media__img' src={ img } alt={ username } />
            </div>
            <div className='sidebar__profile__title'>
              {username}
            </div>
            <div className='sidebar__profile__balance'>
              Баланс: {balance}
            </div>
          </div>}
        </div>
        <ul className='sidebar__navigation'>
          <li className='sidebar__navigation__item sidebar__navigation__item--create'>
            <a href='/' className='sidebar__navigation__link'>Оформить объявление</a>
          </li>
          <li className='sidebar__navigation__item sidebar__navigation__item--my'>
            <a href='/' className='sidebar__navigation__link'>Мои объявления</a>
          </li>
          <li className='sidebar__navigation__item sidebar__navigation__item--messages'>
            <a href='/' className='sidebar__navigation__link'>Сообщения</a>
          </li>
          <li className='sidebar__navigation__item sidebar__navigation__item--saved'>
            <a href='/' className='sidebar__navigation__link'>Сохраненные</a>
          </li>
          <li className='sidebar__navigation__item sidebar__navigation__item--viewed'>
            <a href='/' className='sidebar__navigation__link'>Просмотренные</a>
          </li>
          <li className='sidebar__navigation__item sidebar__navigation__item--settings'>
            <a href='/' className='sidebar__navigation__link'>Настройки</a>
          </li>
          <li className='sidebar__navigation__item sidebar__navigation__item--recommend'>
            <a href='/' className='sidebar__navigation__link'>Рекомендовать</a>
          </li>
          {!loggedIn &&
          <li className='sidebar__navigation__item sidebar__navigation__item--recommend'>
            <Link
              to='/sign-in' className='sidebar__navigation__link' onClick={ this.onToggleSidebar }
            >
              Войти
            </Link>
          </li>}
          {loggedIn &&
          <li className='sidebar__navigation__item sidebar__navigation__item--recommend'>
            <Link
              to='/sign-in'
              className='sidebar__navigation__link' onClick={ this.onToggleSidebar }
            >
              Выйти
            </Link>
          </li>}
        </ul>
      </div>
    );
  }
}

Sidebar.propTypes = {
  auth: React.PropTypes.object.isRequired,
  toggle: React.PropTypes.func.isRequired,
};

function mapToProps(state) {
  const auth = state.auth;

  return {
    auth,
  };
}

export default connect(mapToProps)(Sidebar);

import React from 'react';

export default class Sidebar extends React.Component {
  render() {
    return (
      <div className='sidebar'>
        <div className='sidebar__profile'>
          <div className='sidebar__profile__media'>
            <img className='sidebar__profile__media__img' src='img/pic.png' alt='' />
          </div>
          <div className='sidebar__profile__title'>
            Владимир
          </div>
          <div className='sidebar__profile__balance'>
            Баланс: 0
          </div>
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
          <li className='sidebar__navigation__item sidebar__navigation__item--signout'>
            <a href='/' className='sidebar__navigation__link'>Выход</a>
          </li>
        </ul>
      </div>
    );
  }
}

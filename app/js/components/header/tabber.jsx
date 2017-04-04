import React from 'react';
import { Link, IndexLink } from 'react-router';

export default class Tabber extends React.Component {
  render() {
    const showBanner = window.location.pathname === '/';

    return (
      <div className='tab-wrapper'>
        <ul className='tab'>
          <li className='tab__item tab__item--logo desktop'>
            <IndexLink to='/' className='tab__link' />
          </li>
          <li className='tab__item'>
            <IndexLink to='/companies' className='tab__link' activeClassName='tab__link--active'>
              Компании
            </IndexLink>
          </li>
          <li className='tab__item'>
            <Link to='/automobiles' className='tab__link' activeClassName='tab__link--active'>
              Автомобили
            </Link>
          </li>
          <li className='tab__item'>
            <Link to='/spare-parts' className='tab__link' activeClassName='tab__link--active'>
              Запчасти
            </Link>
          </li>
          <li className='tab__item'>
            <Link to='/services' className='tab__link' activeClassName='tab__link--active'>
              Услуги
            </Link>
          </li>
          <li className='tab__item'>
            <Link to='/cargos' className='tab__link' activeClassName='tab__link--active'>
              Грузовые
            </Link>
          </li>
        </ul>
        {showBanner && <div className='desktop main-banner'>
          <div className='main-banner__text main-banner__text--main'>
            Скачайте наше официальное приложение
          </div>
          <div className='main-banner__text main-banner__text--secondary'>
            Будьте вместе с нами, где бы вы ни были
          </div>
          <div className='download'>
            <a href='/' className='download__item download__item--appstore'>&nbsp;</a>
            <a href='/' className='download__item download__item--playmarket'>&nbsp;</a>
          </div>
          <button className='button-to button-to--down button__transparent'>
            <i className='fa fa-chevron-down' />
          </button>
        </div>}
      </div>
    );
  }
}

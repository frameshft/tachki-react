import React from 'react';
import { Link, IndexLink } from 'react-router';

export default class Tabber extends React.Component {
  render() {
    return (
      <ul className='tab'>
        <li className='tab__item'>
          <IndexLink to='/companies' className='tab__link' activeClassName='tab__link--active'>
            Компании
          </IndexLink>
        </li>
        <li className='tab__item'>
          <Link to='/cars' className='tab__link' activeClassName='tab__link--active'>
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
      </ul>
    );
  }
}

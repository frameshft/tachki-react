import React from 'react';
import { Link, IndexLink } from 'react-router';
import Sidebar from './sidebar';

export default class Tabber extends React.Component {
  constructor(props) {
    super(props);

    this.toggleSidebar = this.toggleSidebar.bind(this);
    this.closeSidebar = this.closeSidebar.bind(this);

    this.state = {
      showSidebar: false,
    };
  }

  toggleSidebar() {
    this.setState({
      showSidebar: !this.state.showSidebar,
    });
  }

  closeSidebar() {
    this.setState({
      showSidebar: false,
    });
  }

  render() {
    const { showSidebar } = this.state;
    // FIXME: Adilet, fixme, please; Сделай изящнее, нам пришлось хардкодить;
    const cls = window.location.pathname === '/' || window.location.pathname === '/companies' ? ' active-cls' : '';

    // FIXME: Adilet, fixme, please; Сделай изящнее, нам пришлось хардкодить;
    let wrapperCls = '';
    if (window.location.pathname === '/sign-in') {
      wrapperCls = ' hidden';
    }

    return (
      <div className={ `tab-wrapper${wrapperCls}` }>
        <ul className='tab'>
          <li className='tab__item tab__item--sandwich'>
            <button className='tab__item--sandwich__btn' onClick={ this.toggleSidebar } />
          </li>
          <li className='tab__item tab__item--logo desktop'>
            <IndexLink to='/' className='tab__link' />
          </li>
          <li className='tab__item'>
            <IndexLink to='/companies' className={ `tab__link${cls}` } activeClassName='tab__link--active'>
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
            <Link to='/cargo' className='tab__link' activeClassName='tab__link--active'>
              Грузовые
            </Link>
          </li>
        </ul>
        { showSidebar && <Sidebar close={ this.closeSidebar } isDesktop /> }
        {/* {showBanner && <div className='desktop main-banner'>
          <div className='main-banner__text main-banner__text--main'>
            Скачайте наше официальное приложение
          </div>
          <div className='main-banner__text main-banner__text--secondary'>
            Будьте вместе с нами, где бы вы ни были
          </div>
          <div className='download'>
            <a href='https://itunes.apple.com/ru/app/tachki-kg/id1188571920?mt=8' className='download__item download__item--appstore'>&nbsp;</a>
            <a href='https://play.google.com/store/apps/details?id=kg.mirsoft.tachki&hl=ru' className='download__item download__item--playmarket'>&nbsp;</a>
          </div>
          <button className='button-to button-to--down button__transparent'>
            <i className='fa fa-chevron-down' />
          </button>
        </div>}*/ }
      </div>
    );
  }
}

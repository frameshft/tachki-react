/* eslint-disable global-require */
import React from 'react';

import Header from './header/header';
import Tabber from './header/tabber';
import Sidebar from './header/sidebar';

import '../../style/style.scss';

export default class Application extends React.Component {

  render() {
    const pathName = this.props.routes[1].title;
    const controls = this.props.routes[1].controls;
    const params = this.props.params.id || '';

    return (
      <div className='app'>
        <Header title={ pathName } controls={ controls } params={ params } />
        <Tabber />
        <div className='main cf'>
          <Sidebar />
          { this.props.children }
        </div>

        <div className='footer'>
          <div className='download'>
            <a href='/' className='download__item download__item--android'>
              <img src={ require('../../img/playmarket.png') } className='download__item__img' alt='' />
            </a>
            <a href='/' className='download__item download__item--ios'>
              <img src={ require('../../img/appstore.png') } className='download__item__img' alt='' />
            </a>
          </div>
          <div className='copyright'>
            <div className='footer__nav desktop'>
              <a href='/' className='footer__links'>
                Правила/Помощь
              </a>
              <a href='/' className='footer__links'>
                Пользовательское соглашение
              </a>
            </div>
            Разработано Mirsoft LLC.
          </div>
        </div>
      </div>
    );
  }
}

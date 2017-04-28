/* eslint-disable global-require */
import React from 'react';
import { Link } from 'react-router';

import Header from './header/header';
import Tabber from './header/tabber';

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
          { this.props.children }
        </div>

        <div className='footer'>
          <div className='download'>
            <a href='/' className='download__item download__item--playmarket'>&nbsp;</a>
            <a href='/' className='download__item download__item--appstore'>&nbsp;</a>
          </div>
          <div className='copyright'>
            <div className='footer__nav desktop'>
              <Link to='/faq' className='footer__links'>Помощь/Правила</Link>
              <Link to='/agreement' className='footer__links'>Пользовательское соглашение</Link>
            </div>
            Разработано Mirsoft LLC.
          </div>
        </div>
      </div>
    );
  }
}

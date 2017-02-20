/* eslint-disable global-require */
import React from 'react';

import Header from './header/header';
import Tabber from './header/tabber';

import '../../style/style.scss';

export default class Application extends React.Component {

  render() {
    return (
      <div className='app'>
        <Header />
        <Tabber />
        { this.props.children }
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
            Разработано Mirsfot LLC.
          </div>
        </div>
      </div>
    );
  }
}

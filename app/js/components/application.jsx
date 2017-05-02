/* eslint-disable global-require */
import React from 'react';
import { Link } from 'react-router';
import Swipeable from 'react-swipeable';

import Header from './header/header';
import Tabber from './header/tabber';

import '../../style/style.scss';

export default class Application extends React.Component {
  constructor(props) {
    super(props);
    this.onSkip = this.onSkip.bind(this);
    this.onInstallBtn = this.onInstallBtn.bind(this);
    this.onHideBanner = this.onHideBanner.bind(this);
    this.state = {
      skip: false,
      hideSmallBanner: false,
      platform: this.getPlatform(),
    };
  }

  onInstallBtn() {
    const { platform } = this.state;
    switch (platform) {
      case 'android':
        window.location = 'https://play.google.com/store/apps/details?id=kg.mirsoft.tachki&hl=ru';
        break;
      case 'ios':
        window.location = 'https://itunes.apple.com/ru/app/tachki-kg/id1188571920?mt=8';
        break;
      default:
        break;
    }
  }

  onSkip() {
    this.setState({ skip: true });
  }

  onHideBanner() {
    this.setState({ hideSmallBanner: true });
  }

  getPlatform() {
    const agent = navigator.userAgent.toLowerCase();
    if (agent.indexOf('android') > -1) return 'android';
    if (agent.indexOf('iphone') > -1) return 'ios';
    return null;
  }

  renderSkipBanner() {
    const { skip } = this.state;
    if (skip) return null;
    return (
      <Swipeable onSwiped={ this.onSkip } className='mobile-banner'>
        <div className='mobile-banner__logo' />
        <button className='button__transparent btn-close' onClick={ this.onSkip } />
        <div className='mobile-banner__text'>
          Установить приложение
        </div>
        <div className='download'>
          <a href='https://play.google.com/store/apps/details?id=kg.mirsoft.tachki&hl=ru' className='download__item download__item--playmarket'>&nbsp;</a>
          <br />
          <a href='https://itunes.apple.com/ru/app/tachki-kg/id1188571920?mt=8' className='download__item download__item--appstore'>&nbsp;</a>
        </div>
        <button className='button__transparent btn-down' onClick={ this.onSkip }><i className='fa fa-angle-up' /></button>
      </Swipeable>
    );
  }

  renderSmallBanner() {
    const { hideSmallBanner } = this.state;
    if (hideSmallBanner) return null;
    return (
      <div className='top-banner'>
        <button className='top-banner__close' onClick={ this.onHideBanner } />
        <div className='top-banner__logo' />
        <div className='top-banner__text'>
          Доступно <br /> приложение
        </div>
        <button className='top-banner__download' onClick={ this.onInstallBtn }>
          Установить
        </button>
      </div>
    );
  }

  render() {
    const pathName = this.props.routes[1].title;
    const controls = this.props.routes[1].controls;
    const params = this.props.params.id || '';

    return (
      <div className='app'>
        { this.renderSkipBanner() }
        { this.renderSmallBanner() }
        <Header title={ pathName } controls={ controls } params={ params } />
        <Tabber />
        <div className='main cf'>
          { this.props.children }
        </div>

        <div className='footer'>
          <div className='download'>
            <a href='https://play.google.com/store/apps/details?id=kg.mirsoft.tachki&hl=ru' className='download__item download__item--playmarket'>&nbsp;</a>
            <a href='https://itunes.apple.com/ru/app/tachki-kg/id1188571920?mt=8' className='download__item download__item--appstore'>&nbsp;</a>
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

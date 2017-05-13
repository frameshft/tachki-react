import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Helmet } from 'react-helmet';
import PostsList from '../components/shared/posts.list';

import '../../style/frontpage.scss';

class Frontpage extends React.Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>Tachki.KG — все, что нужно автолюбителям в одном сервисе</title>
          <meta
            name='description'
            content='Купля и продажа авто в Бишкеке и по всему Кыргызстану, поиск автозапчастей и других услуг для автомобилей: автомойки, СТО и многое другое.'
          />
        </Helmet>
        <div className='frontpage'>
          <div className='frontpage__block desktop'>
            <PostsList isFrontPage postType='automobiles' />
            <Link to='/automobiles' className='frontpage__block__more'>
              Больше объявлений
            </Link>
          </div>
          <div className='middle-banner desktop'>
            <div className='middle-banner__content'>
              <div className='middle-banner__title'>
                  Заявите о себе
            </div>
              <div className='middle-banner__text'>
                Занимаетесь ли вы продажей запчастей,
                либо предоставлением автомобильных услуг,
                дайте о себе знать с нашей помощью.
              </div>
              <a href='/' className='middle-banner__more'>
                Узнать больше
              </a>
            </div>
          </div>
          <div className='frontpage__block'>
            <PostsList isFrontPage postType='companies' />
            <Link to='/companies' className='frontpage__block__more'>
              Больше компаний
            </Link>
          </div>
          <div className='desktop bottom-banner'>
            <div className='bottom-banner__text bottom-banner__text--main'>
              Скачайте наше официальное приложение
            </div>
            <div className='bottom-banner__text bottom-banner__text--secondary'>
              Будьте вместе с нами, где бы вы ни были
            </div>
            <div className='download'>
              <a
                href='https://play.google.com/store/apps/details?id=kg.mirsoft.tachki&hl=ru' target='_blank' rel='noopener noreferrer'
                className='download__item download__item--playmarket'
              >&nbsp;
              </a>
              <a
                href='https://itunes.apple.com/ru/app/tachki-kg/id1188571920?mt=8' target='_blank' rel='noopener noreferrer'
                className='download__item download__item--appstore'
              >&nbsp;
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapToProps(state) {
  return {
    ...state,
    pageLocation: state.pageLocation,
  };
}

export default connect(mapToProps)(Frontpage);

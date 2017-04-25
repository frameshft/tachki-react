import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Companies from '../components/companies/companies.list';
import Cars from '../components/cars/cars.list';

import '../../style/frontpage.scss';

class Frontpage extends React.Component {
  render() {
    return (
      <div>
        <div className='frontpage'>
          <div className='frontpage__block'>
            <Companies isFrontPage />
            <Link to='/companies' className='frontpage__block__more'>
              Больше компаний
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
          <div className='frontpage__block desktop'>
            <Cars isFrontPage />
            <Link to='/automobiles' className='frontpage__block__more'>
              Больше объявлений
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
              <a href='/' className='download__item download__item--appstore'>&nbsp;</a>
              <a href='/' className='download__item download__item--playmarket'>&nbsp;</a>
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
  };
}

export default connect(mapToProps)(Frontpage);

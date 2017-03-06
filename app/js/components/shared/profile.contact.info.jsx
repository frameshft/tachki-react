import React from 'react';
import moment from 'moment';

export default class ProfileContactInfo extends React.Component {
  render() {
    const { post, parentCls } = this.props;

    return (
      <div className={ parentCls }>
        <div className='profile__contact profile__contact--phone'>
          <div className='profile__contact__row'>
            <div className='profile__contact__label'>
              Контактная информация
            </div>
            <div className='profile__contact__value'>
              { post.phone }
            </div>
          </div>
        </div>
        <div className='profile__contact profile__contact--address'>
          <div className='profile__contact__row'>
            <div className='profile__contact__label'>
              Адрес
            </div>
            <div className='profile__contact__value'>
              { post.address }
            </div>
          </div>
        </div>
        <div className='profile__contact profile__contact--message'>
          <div className='profile__contact__row'>
            <div className='profile__contact__label'>
              Напишите пользователю
            </div>
            <div className='profile__contact__value'>
              был(-а) { moment(post.last_login).format('MMMM Do YYYY, hh:mm:ss') }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

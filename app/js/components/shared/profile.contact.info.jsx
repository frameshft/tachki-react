import React from 'react';

export default class ProfileContactInfo extends React.Component {
  render() {
    const { post, parentCls } = this.props;
    const showPhones = post.contactPhone !== '' || post.phone;

    return (
      <div className={ parentCls }>
        {showPhones && <div className='profile__contact profile__contact--phone'>
          {post.contactPhone && <div className='profile__contact__row'>
            <div className='profile__contact__label'>
              Контактный телефон
            </div>
            <div className='profile__contact__value'>
              { post.contactPhone }
            </div>
          </div>}
          {post.phone && <div className='profile__contact__row'>
            <div className='profile__contact__label'>
              Телефон пользователя
            </div>
            <div className='profile__contact__value'>
              { post.phone }
            </div>
          </div>}
        </div>}
        {post.address && <div className='profile__contact profile__contact--address'>
          <div className='profile__contact__row'>
            <div className='profile__contact__label'>
              Адрес
            </div>
            <div className='profile__contact__value'>
              { post.address }
            </div>
          </div>
        </div>}
      </div>
    );
  }
}

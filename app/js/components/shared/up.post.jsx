import React from 'react';
import { connect } from 'react-redux';
import BtnUp from './up.post.btn';
import BtnVip from './vip.post.btn';

class UpPost extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      post: props.posts[this.props.params.id],
    };
  }

  render() {
    const { post } = this.state;
    const { user } = this.props;

    return (
      <div className='up-page'>
        <div className='up-page__top'>
          Статус VIP визуально выделит ваше объявление и позволит ему ВСЕГДА быть первым в списках.
        </div>
        <div className='vip'>
          <div className='vip__description'>
            Стоимость - 300 сом за неделю показа
          </div>
          <BtnVip post={ post } />
        </div>
        <div className='up-page__up'>
          <div className='up-page__up__title'>
            Поднимите объявление в верх списка. Услуга совершенно бесплатно.
          </div>
          <div className='up-page__up__notice'>
            Не более одного раза в течение часа
          </div>
          <BtnUp post={ post } />
        </div>
        <div className='balance'>
          <div className='balance__title'>
            На вашем балансе:
            <div className='balance__value'>
              { user.balance } сом
            </div>
          </div>
          <div className='balance__recharge'>
            <div className='balance__recharge__title'>
              Пополнить баланс можно через терминалы платежной системы МОБИЛЬНИК:
            </div>
            <ol className='balance__recharge__list'>
              <li className='balance__recharge__item'>
                Выбрать категорию объявления
              </li>
              <li className='balance__recharge__item'>
                Выбрать услугу Tachki.kg
              </li>
              <li className='balance__recharge__item'>
                Ввести лицевой счет (ваш номер телефона)
              </li>
              <li className='balance__recharge__item'>
                Убедиться в правильности введенных данных
              </li>
              <li className='balance__recharge__item'>
                Внести купюры
              </li>
              <li className='balance__recharge__item'>
                Нажать кнопку Далее и получить чек
              </li>
            </ol>
            Сохраните чек до зачисления платежа на ваш баланс
          </div>
        </div>
      </div>
    );
  }
}

UpPost.propTypes = {
  posts: React.PropTypes.object.isRequired,
  user: React.PropTypes.object.isRequired,
};

UpPost.defaultProps = {
  user: {},
};

function mapToProps(state) {
  const posts = state.entities.posts;
  const user = state.auth.user || {};

  return {
    posts,
    user,
  };
}

export default connect(mapToProps)(UpPost);

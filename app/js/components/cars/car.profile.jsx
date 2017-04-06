import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Link } from 'react-router';
import MediaQuery from 'react-responsive';
import store from '../../store';
import FavoriteToggle from '../shared/favorite.toggle';
import VipPost from '../shared/vip.post.btn';
import Controls from '../shared/controls.post';

import profileNames from '../../constants/car.profile.names';
import ContactInfo from '../shared/profile.contact.info';

import { getPost } from '../../actions/posts';

import '../../../style/car-profile.scss';

import SimilarPosts from '../shared/similar.post';
import { importImage } from '../../utils';

class CarProfile extends React.Component {
  constructor(props) {
    super(props);

    this.thumbClick = this.thumbClick.bind(this);

    this.state = {
      mainImgIndex: 0,
    };
  }

  componentDidMount() {
    store.dispatch(getPost('automobiles', this.props.params.id));
  }

  componentWillUpdate(nextProps) {
    if (nextProps.user.token !== this.props.user.token) {
      store.dispatch(getPost('automobiles', this.props.params.id));
    }
  }

  thumbClick(index) {
    this.setState({
      mainImgIndex: index,
    });
  }

  renderEquiments(equipments) {
    if (equipments && equipments.length > 0) {
      return (<div className='car-profile__row'>
        <h3 className='car-profile__main__title'>Комплектация</h3>
        <div className='car-profile__main__description'>
          { equipments }
        </div>
      </div>);
    }
    return null;
  }

  renderProfile() {
    const { car } = this.props;
    const services = [];
    if (car !== undefined && car.profile !== undefined) {
      let keys = Object.keys(car.profile);
      keys = keys.filter(x => x !== 'equipments');


      keys.forEach((profile, i) => {
        let profileValue;
        if (profile === 'is_custom_cleared' || profile === 'is_document_issued' || profile === 'is_exchangeable') {
          profileValue = car.profile[profile] ? 'Да' : 'Нет';
        } else {
          profileValue = car.profile[profile];
        }

        if (car.profile[profile] !== '') {
          services.push(
            <div className='car-profile__profile__row' key={ i }>
              <div className='car-profile__profile__label'>
                { profileNames[profile] }
              </div>
              <div className='car-profile__profile__value'>
                { profileValue }
              </div>
            </div>,
          );
        }
      });
    }

    return services;
  }

  renderThumbs(images) {
    return images.map((image, index) => (
      <button
        className='car-profile__gallery__thumb'
        onClick={ this.thumbClick.bind(this, index) } // eslint-disable-line
        key={ index }
      >
        <img src={ importImage(image) } alt={ index } />
      </button>))
      ;
  }

  render() {
    const { car, user } = this.props;
    const { mainImgIndex } = this.state;
    const postUser = car.user;
    if (car.profile === undefined) {
      return null;
    }

    const image = importImage(car.images[0]);

    return (
      <div className='car-profile'>
        <MediaQuery maxWidth={ 767 }>
          { user.token && <FavoriteToggle post={ car } /> }
          {car && <Controls post={ car } user={ user } /> }
          <div className='car-profile__media'>
            <button className='button__transparent' onClick={ this.onModalShow }>
              <img
                src={ image }
                alt={ car.title }
                className='car-profile__media__img'
              />
            </button>
            <div className='car-profile__price'>
              { car.price } сом
            </div>
          </div>
          <div className='car-profile__wrapper'>
            <h3 className='car-profile__name car-profile__row'>
              { car.title }
            </h3>
            <div className='car-profile__profile car-profile__row'>
              {this.renderProfile()}
            </div>

            <div className='car-profile__main'>
              { car.description && <div className='car-profile__row'>
                <h3 className='car-profile__main__title'>
                  Описание
                </h3>
                <div className='car-profile__main__description'>
                  { car.description }
                </div>
              </div>}
            </div>
            <div className='car-profile__comments'>
              <div className='car-profile__comments__top'>
                <div className='car-profile__comments__media'>
                  &nbsp;
                </div>
                <div className='car-profile__comments__user'>
                  Александр
                  <div className='car-profile__comments__date'>
                    20-01-2017 15:44
                  </div>
                </div>
              </div>
              <div className='car-profile__comments__text'>
                Желаю удачи в продаже!!! Единичный экземпляр
              </div>
              <Link to={ `/comments/${car.id}` } className='car-profile__comments__all'>
                Комментарии 1
              </Link>
            </div>
            <div className='car-profile__box car-profile__views'>
              Это объявление посмотрели
              <div className='car-profile__views__num'>{ car.num_views } раз(а)</div>
              { car.isMy &&
              <div className='car-profile__up'>
                <div className='car-profile__up__description'>
                  Для того, чтобы повысить количество просмотров Вашего
                  объявления, Вы можете поднять объявление в ТОП
                </div>
                <Link to={ `/up/${car.id}` } className='btn btn--vip'>
                  Поднять объявление
                </Link>
              </div>
              }
            </div>
            <ContactInfo post={ car } parentCls='' />
            <SimilarPosts post={ car } />
          </div>
          { car.isMy && !car.isVip && <VipPost postId={ car.id } /> }
        </MediaQuery>
        <MediaQuery minWidth={ 767 }>
          {car && <Controls post={ car } user={ user } /> }
          <div className='car-profile__top'>
            <div className='car-profile__top__media'>
              <img src={ importImage(postUser.image) } alt='' />
              <div className='car-profile__top__username'>
                { postUser.name }
              </div>
            </div>
            <div className='car-profile__top__center'>
              <h1 className='car-profile__name'>
                <div>
                  { car.title }
                </div>
              </h1>
              <div className='car-profile__top__controls'>
                { user.token && <FavoriteToggle post={ car } isDesktop /> }
                {/* TODO: add crud */}
                {/* { car.isMy && <button className='button__transparent btn--edit' /> } */}
                <button className='button__transparent btn--marker'>
                  Показать на карте
                </button>
                <div className='car-profile__top__info'>
                  <span> { moment(car.created_at).format('DD MMMM') }</span>
                </div>
              </div>
            </div>
            <div className='car-profile__top__price'>
              <div className='car-profile__top__price__value'>
                { car.price } сом
              </div>
              { car.is_exchangeable && <div className='is-exchangeable'>Возможен обмен</div>}
              <div className='is-exchangeable'>Возможен обмен</div>
            </div>
          </div>
          <div className='car-profile__body'>
            <div className='car-profile__head'>
              <div className='car-profile__profile car-profile__row'>
                {this.renderProfile()}
              </div>
              <div className='car-profile__gallery'>
                <div className='car-profile__gallery__main'>
                  <img src={ importImage(car.images[mainImgIndex]) } alt='' />
                </div>
                <div className='car-profile__gallery_thumbs'>
                  {this.renderThumbs(car.images)}
                </div>
              </div>
            </div>
            <div className='car-profile__main'>
              { car.description && <div className='car-profile__row'>
                <h3 className='car-profile__main__title'>
                  Описание
                </h3>
                <div className='car-profile__main__description'>
                  { car.description }
                </div>
              </div>}
              { this.renderEquiments(car.profile.equipments) }
            </div>
            <div className='car-profile__comments'>
              <div className='car-profile__comments__top'>
                <div className='car-profile__comments__media'>
                  &nbsp;
                </div>
                <div className='car-profile__comments__user'>
                  Александр
                  <div className='car-profile__comments__date'>
                    20-01-2017 15:44
                  </div>
                </div>
              </div>
              <div className='car-profile__comments__text'>
                Желаю удачи в продаже!!! Единичный экземпляр
              </div>
              <Link to={ `/comments/${car.id}` } className='car-profile__comments__all'>
                Комментарии 1
              </Link>
            </div>
            <div className='car-profile__box car-profile__views'>
              Это объявление посмотрели
              <div className='car-profile__views__num'>{ car.num_views } раз(а)</div>
              { car.isMy &&
              <div className='car-profile__up'>
                <div className='car-profile__up__description'>
                  Для того, чтобы повысить количество просмотров Вашего
                  объявления, Вы можете поднять объявление в ТОП
                </div>
                <Link to={ `/up/${car.id}` } className='btn btn--vip'>
                  Поднять объявление
                </Link>
              </div>
              }
            </div>
            <ContactInfo post={ car } parentCls='' />
          </div>
          <SimilarPosts post={ car } />
        </MediaQuery>
      </div>
    );
  }
}

CarProfile.propTypes = {
  car: React.PropTypes.object.isRequired,
  user: React.PropTypes.object.isRequired,
};

function mapToProps(state, props) {
  const cars = state.entities.posts;
  const car = cars[props.params.id] || {};
  const user = state.auth.user;

  return {
    car,
    user,
  };
}

export default connect(mapToProps)(CarProfile);

import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router';
import MediaQuery from 'react-responsive';
import store from '../../store';
import FavoriteToggle from '../shared/favorite.toggle';
import VipPost from '../shared/vip.post.btn';
import Controls from '../shared/controls.post';
import ControlsDesktop from '../shared/controls.post.desktop';

import profileNames from '../../constants/car.profile.names';
import ContactInfo from '../shared/profile.contact.info';

import { getPost } from '../../actions/posts';

import '../../../style/car-profile.scss';

import SimilarPosts from '../shared/similar.post';
import { importImage } from '../../utils';
import LastCommentsPost from '../shared/comments.last';
import PostMap from '../shared/map.post';
import ImageSlider from '../shared/image.slider';
import { ADD_HISTORY_POST } from '../../actions/list';

import Spinner from '../shared/spinner';

moment.locale('ru');

class CarProfile extends React.Component {
  constructor(props) {
    super(props);

    this.thumbClick = this.thumbClick.bind(this);
    this.onModalClose = this.onModalClose.bind(this);
    this.onModalShow = this.onModalShow.bind(this);

    this.state = {
      showModal: false,
      mainImgIndex: 0,
    };
  }

  componentDidMount() {
    store.dispatch(getPost('automobiles', this.props.params.id));
    store.dispatch({ type: ADD_HISTORY_POST, data: this.props.params.id });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user.token !== this.props.user.token || this.props.params.id !== nextProps.params.id) {
      store.dispatch(getPost('automobiles', nextProps.params.id));
      store.dispatch({ type: ADD_HISTORY_POST, data: nextProps.params.id });
    }
  }

  onModalClose() {
    this.setState({
      showModal: false,
    });
  }

  onModalShow() {
    this.setState({
      showModal: true,
    });
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

      keys.sort((a, b) => profileNames[a].localeCompare(profileNames[b]));

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
        ref='thumbImage'
      >
        <img src={ importImage(image, this.refs.thumbImage) } alt={ index } />
      </button>))
      ;
  }

  render() {
    const { car, user, isFetching } = this.props;
    const { mainImgIndex, showModal } = this.state;
    const postUser = car.user;
    console.log('This should render');
    console.log(isFetching);
    if (isFetching) {
      return <Spinner />;
    }
    if (car.profile === undefined) {
      return null;
    }


    return (
      <div className='car-profile'>
        <Helmet>
          <title>{ car.htmlTitle }</title>
          <meta name='description' content={ car.htmlDescription } />
          <meta property='og:title' content={ car.htmlTitle } />
          <meta property='og:description' content={ car.htmlDescription } />
        </Helmet>
        <MediaQuery maxWidth={ 767 }>
          { user.token && <FavoriteToggle post={ car } /> }
          {car && <Controls post={ car } user={ user } /> }
          <div className='car-profile__media' ref='image'>
            <ImageSlider images={ car.images } title={ car.title } refImage={ this.refs.image } />
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
              { this.renderEquiments(car.profile.equipments) }
            </div>
            <div className='desktop-created'>
              { moment(car.created_at).format('DD.MM.YYYY') }
            </div>
            <LastCommentsPost post={ car } isAuthenticated={ !!user.token } />
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
            <ContactInfo post={ car } parentCls='' onAddressClick={ this.onModalShow } />
            <SimilarPosts post={ car } />
          </div>
          { car.isMy && !car.isVip && <VipPost post={ car } /> }
        </MediaQuery>
        <MediaQuery minWidth={ 767 }>
          {car && <Controls post={ car } user={ user } /> }
          <div className='car-profile__top'>
            <div className='car-profile__top__media'>
              <div className='car-profile__img__wrapper'>
                <img
                  src={ importImage(postUser.image, this.refs.postUserImg, 'no-user') }
                  alt='' ref='postUserImg'
                />
              </div>
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
                {/* <button className='button__transparent btn--marker' onClick={ this.onModalShow }>
                  Показать на карте
                </button> */}
                <div className='car-profile__top__info'>
                  <span> { moment(car.created_at).format('DD.MM.YYYY') }</span>
                </div>
              </div>
            </div>
            <div className='car-profile__top__price'>
              <div className='car-profile__top__price__value'>
                { car.price } сом
              </div>
              { car.is_exchangeable && <div className='is-exchangeable'>Возможен обмен</div>}
            </div>
          </div>
          <div className='car-profile__body'>
            <div className='car-profile__head'>
              <div className='car-profile__profile car-profile__row'>
                {this.renderProfile()}
              </div>
              <div className='car-profile__gallery'>
                <div className='car-profile__gallery__main' ref='galleryMain'>
                  <img src={ importImage(car.images[mainImgIndex], this.refs.galleryMain) } alt='' />
                </div>
                <div className='car-profile__gallery__thumbs'>
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
            <LastCommentsPost post={ car } isAuthenticated={ !!user.token } />
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
            <ContactInfo post={ car } parentCls='' onAddressClick={ this.onModalShow } />
          </div>
          <ControlsDesktop post={ car } user={ user } />
          <SimilarPosts post={ car } />
        </MediaQuery>
        {showModal &&
        <PostMap
          center={ [car.latitude, car.longitude] }
          items={ [{ lat: car.latitude, lng: car.longitude }] }
          onClose={ this.onModalClose }
        />
        }
      </div>
    );
  }
}

CarProfile.propTypes = {
  car: React.PropTypes.object.isRequired,
  user: React.PropTypes.object.isRequired,
};

function mapToProps(state, props) {
  const postType = props.postType || props.route.postType;
  const cars = state.entities.posts;
  const car = cars[props.params.id] || {};
  const isFetching = cars.isFetching;
  const user = state.auth.user;

  return {
    car,
    user,
    postType,
    isFetching,
  };
}

export default connect(mapToProps)(CarProfile);

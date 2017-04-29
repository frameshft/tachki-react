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
import LastCommentsPost from '../shared/comments.last';
import PostMap from '../shared/map.post';
import ControlsDesktop from '../shared/controls.post.desktop';

moment.locale('ru');

class SparePartProfile extends React.Component {
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
    store.dispatch(getPost('spare-parts', this.props.params.id));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user.token !== this.props.user.token || this.props.params.id !== nextProps.params.id) {
      store.dispatch(getPost('spare-parts', nextProps.params.id));
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

  renderProfile(post) {
    if (!post.profile) return null;
    const services = [];
    const keys = Object.keys(post.profile);
    keys.forEach((profile, i) => {
      let profileValue;
      if (profile === 'is_custom_cleared' || profile === 'is_document_issued' || profile === 'is_exchangeable') {
        profileValue = post.profile[profile] ? 'Да' : 'Нет';
      } else {
        profileValue = post.profile[profile];
      }

      if (post.profile[profile] !== '') {
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
    const { post, user } = this.props;
    const { mainImgIndex, showModal } = this.state;
    const postUser = post.user;
    if (!post || !post.profile) {
      return null;
    }

    return (
      <div className='car-profile'>
        <MediaQuery maxWidth={ 767 }>
          { user.token && <FavoriteToggle post={ post } /> }
          <Controls post={ post } user={ user } />
          <div className='car-profile__media' ref='image'>
            <button className='button__transparent' onClick={ this.onModalShow }>
              <img
                src={ importImage(post.images[0], this.refs.image) }
                alt={ post.title }
                className='car-profile__media__img'
              />
            </button>
            <div className='car-profile__price'>
              { post.price } сом
            </div>
          </div>
          <div className='car-profile__wrapper'>
            <h3 className='car-profile__name car-profile__row'>
              { post.title }
            </h3>
            <div className='car-profile__profile car-profile__row'>
              {this.renderProfile(post)}
            </div>

            <div className='car-profile__main'>
              { post.description && <div className='car-profile__row'>
                <h3 className='car-profile__main__title'>
                  Описание
                </h3>
                <div className='car-profile__main__description'>
                  { post.description }
                </div>
              </div>}
            </div>
            <LastCommentsPost post={ post } isAuthenticated={ !!user.token } />
            <div className='car-profile__box car-profile__views'>
              Это объявление посмотрели
              <div className='car-profile__views__num'>{ post.num_views } раз(а)</div>
              { post.isMy &&
              <div className='car-profile__up'>
                <div className='car-profile__up__description'>
                  Для того, чтобы повысить количество просмотров Вашего
                  объявления, Вы можете поднять объявление в ТОП
                </div>
                <Link to={ `/up/${post.id}` } className='btn btn--vip'>
                  Поднять объявление
                </Link>
              </div>
              }
            </div>
            <ContactInfo post={ post } parentCls='' onAddressClick={ this.onModalShow } />
            <SimilarPosts post={ post } />
          </div>
          { post.isMy && !post.isVip && <VipPost postId={ post.id } /> }
        </MediaQuery>
        <MediaQuery minWidth={ 767 }>
          {post && <Controls post={ post } user={ user } /> }
          <div className='car-profile__top'>
            <div className='car-profile__top__media'>
              <div className='car-profile__img__wrapper'>
                <img src={ importImage(postUser.image, this.refs.postUserImg, 'no-user') } alt='' ref='postUserImg' />
              </div>
              <div className='car-profile__top__username'>
                { postUser.name }
              </div>
            </div>
            <div className='car-profile__top__center'>
              <h1 className='car-profile__name'>
                <div>
                  { post.title }
                </div>
              </h1>
              <div className='car-profile__top__controls'>
                { user.token && <FavoriteToggle post={ post } isDesktop /> }
                {/* TODO: add crud */}
                {/* { car.isMy && <button className='button__transparent btn--edit' /> } */}
                <button className='button__transparent btn--marker' onClick={ this.onModalShow }>
                  Показать на карте
                </button>
                <div className='car-profile__top__info'>
                  <span> { moment(post.created_at).format('DD.MM.YYYY') }</span>
                </div>
              </div>
            </div>
            <div className='car-profile__top__price'>
              <div className='car-profile__top__price__value'>
                { post.price } сом
              </div>
            </div>
          </div>
          <div className='car-profile__body'>
            <div className='car-profile__head'>
              <div className='car-profile__profile car-profile__row'>
                { this.renderProfile(post) }
              </div>
              <div className='car-profile__gallery'>
                <div className='car-profile__gallery__main' ref='galleryMain'>
                  <img src={ importImage(post.images[mainImgIndex], this.refs.galleryMain) } alt='' />
                </div>
                <div className='car-profile__gallery_thumbs'>
                  {this.renderThumbs(post.images)}
                </div>
              </div>
            </div>
            <div className='car-profile__main'>
              { post.description && <div className='car-profile__row'>
                <h3 className='car-profile__main__title'>
                  Описание
                </h3>
                <div className='car-profile__main__description'>
                  { post.description }
                </div>
              </div>}
            </div>
            <LastCommentsPost post={ post } isAuthenticated={ !!user.token } />
            <div className='car-profile__box car-profile__views'>
              Это объявление посмотрели
              <div className='car-profile__views__num'>{ post.num_views } раз(а)</div>
              { post.isMy &&
              <div className='car-profile__up'>
                <div className='car-profile__up__description'>
                  Для того, чтобы повысить количество просмотров Вашего
                  объявления, Вы можете поднять объявление в ТОП
                </div>
                <Link to={ `/up/${post.id}` } className='btn btn--vip'>
                  Поднять объявление
                </Link>
              </div>
              }
            </div>
            <ContactInfo post={ post } parentCls='' onAddressClick={ this.onModalShow } />
          </div>
          <ControlsDesktop post={ post } user={ user } />
          <SimilarPosts post={ post } />
        </MediaQuery>
        {showModal &&
        <PostMap
          center={ [post.latitude, post.longitude] }
          items={ [{ lat: post.latitude, lng: post.longitude }] }
          onClose={ this.onModalClose }
        />
        }
      </div>
    );
  }
}

SparePartProfile.propTypes = {
  post: React.PropTypes.object.isRequired,
  user: React.PropTypes.object.isRequired,
};

function mapToProps(state, props) {
  const cars = state.entities.posts;
  const post = cars[props.params.id] || {};
  const user = state.auth.user;

  return {
    post,
    user,
  };
}

export default connect(mapToProps)(SparePartProfile);

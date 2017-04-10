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

moment.locale('ru');

class CargoProfile extends React.Component {
  constructor(props) {
    super(props);

    this.thumbClick = this.thumbClick.bind(this);

    this.state = {
      mainImgIndex: 0,
    };
  }

  componentDidMount() {
    store.dispatch(getPost('cargo', this.props.params.id));
  }

  componentWillUpdate(nextProps) {
    if (nextProps.user.token !== this.props.user.token) {
      store.dispatch(getPost('cargo', this.props.params.id));
    }
  }

  thumbClick(index) {
    this.setState({
      mainImgIndex: index,
    });
  }

  renderProfile() {
    const { post } = this.props;
    const services = [];
    if (post !== undefined && post.profile !== undefined) {
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
    const { post, user } = this.props;
    const { mainImgIndex } = this.state;
    const postUser = post.user;
    if (post.profile === undefined) {
      return null;
    }

    const image = importImage(post.images[0]);

    return (
      <div className='car-profile'>
        <MediaQuery maxWidth={ 767 }>
          { user.token && <FavoriteToggle post={ post } /> }
          {post && <Controls post={ post } user={ user } /> }
          <div className='car-profile__media'>
            <button className='button__transparent' onClick={ this.onModalShow }>
              <img
                src={ image }
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
              {this.renderProfile()}
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
            <LastCommentsPost post={ post } />
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
            <ContactInfo post={ post } parentCls='' />
            <SimilarPosts post={ post } />
          </div>
          { post.isMy && !post.isVip && <VipPost postId={ post.id } /> }
        </MediaQuery>
        <MediaQuery minWidth={ 767 }>
          {post && <Controls post={ post } user={ user } /> }
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
                  { post.title }
                </div>
              </h1>
              <div className='car-profile__top__controls'>
                { user.token && <FavoriteToggle post={ post } isDesktop /> }
                {/* TODO: add crud */}
                {/* { car.isMy && <button className='button__transparent btn--edit' /> } */}
                <button className='button__transparent btn--marker'>
                  Показать на карте
                </button>
                <div className='car-profile__top__info'>
                  <span> { moment(post.created_at).format('DD MMMM') }</span>
                </div>
              </div>
            </div>
            <div className='car-profile__top__price'>
              <div className='car-profile__top__price__value'>
                { post.price } сом
              </div>
              { post.is_exchangeable && <div className='is-exchangeable'>Возможен обмен</div>}
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
                  <img src={ importImage(post.images[mainImgIndex]) } alt='' />
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
            <LastCommentsPost post={ post } />
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
            <ContactInfo post={ post } parentCls='' />
          </div>
          <SimilarPosts post={ post } />
        </MediaQuery>
      </div>
    );
  }
}

CargoProfile.propTypes = {
  post: React.PropTypes.object.isRequired,
  user: React.PropTypes.object.isRequired,
};

function mapToProps(state, props) {
  const posts = state.entities.posts;
  const post = posts[props.params.id] || {};
  const user = state.auth.user;

  return {
    post,
    user,
  };
}

export default connect(mapToProps)(CargoProfile);

import React from 'react';
import { connect } from 'react-redux';
import API from '../../api';
import store from '../../store';
import FavoriteToggle from '../shared/favorite.toggle';
import VipPost from '../shared/vip.post.btn';
import Controls from '../shared/controls.post';

import profileNames from '../../constants/car.profile.names';

import { STORE_A_POST } from '../../actions/posts';

import '../../../style/car-profile.scss';

class CarProfile extends React.Component {
  static fetchCompanies(id) {
    API.fetch(`/automobiles/${id}/`)
      .then((res) => {
        store.dispatch({
          type: STORE_A_POST,
          data: {
            [res.id]: res,
          },
        });
      });
  }

  componentDidMount() {
    CarProfile.fetchCompanies(this.props.params.id);
  }

  componentWillUpdate(nextProps) {
    if (nextProps.user.token !== this.props.user.token) {
      CarProfile.fetchCompanies(this.props.params.id);
    }
  }

  renderProfile() {
    const { car } = this.props;
    const services = [];
    if (car !== undefined && car.profile !== undefined) {
      const keys = Object.keys(car.profile);

      keys.forEach((profile) => {
        services.push(
          <div className='car-profile__profile__row'>
            <div className='car-profile__profile__label'>
              { profileNames[profile] }
            </div>
            <div className='car-profile__profile__value'>
              { car.profile[profile] }
            </div>
          </div>,
        );
      });
    }

    return services;
  }

  render() {
    const { car, user } = this.props;

    let image;

    if (car !== undefined) {
      image = car.image ? car.image : '';
    }

    return (
      <div>
        { user.token && car && !car.isMy && <FavoriteToggle postId={ car.id } /> }
        { car && car.isMy && <Controls car={ car } /> }
        {car && <div className='car-profile'>
          <div className='car-profile__media'>
            <button className='button__transparent' onClick={ this.onModalShow }>
              <img
                src={ image }
                alt={ car.name }
                className='car-profile__media__img'
              />
            </button>
            <div className='car-profile__price'>
              { car.price } сом
            </div>
          </div>
          <h3 className='car-profile__name car-profile__row'>
            { car.title }
          </h3>
          {car.profile && <div className='car-profile__profile car-profile__row'>
            {this.renderProfile()}
          </div>}
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
          <div>
            { car.phone }
          </div>
          <div>
            { car.address }
          </div>
        </div>}
        { car && car.isMy && !car.is_vip && <VipPost postId={ car.id } /> }
      </div>
    );
  }
}

CarProfile.propTypes = {
  user: React.PropTypes.object.isRequired,
};

function mapToProps(state, props) {
  const cars = state.entities.posts;
  const car = cars[props.params.id];
  const user = state.auth.user;

  return {
    car,
    user,
  };
}

export default connect(mapToProps)(CarProfile);

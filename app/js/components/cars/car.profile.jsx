import React from 'react';
import { connect } from 'react-redux';
import API from '../../api';
import store from '../../store';
import FavoriteToggle from '../shared/favorite.toggle';
import VipPost from '../shared/vip.post.btn';
import Controls from '../shared/controls.post';

import { STORE_A_POST } from '../../actions/posts';

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

  render() {
    const { cars, user } = this.props;
    const car = cars[this.props.params.id];

    return (
      <div>
        { user.token && car && !car.isMy && <FavoriteToggle postId={ car.id } /> }
        { car && car.isMy && <Controls car={ car } /> }
        {car && <div>
          <div>
            { car.title }
          </div>
          <div>
            <img src={ car.image } alt={ car.name } />
          </div>
          <div>
            { car.description }
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
  cars: React.PropTypes.object.isRequired,
  user: React.PropTypes.object.isRequired,
};

function mapToProps(state) {
  const cars = state.entities.posts;
  const user = state.auth.user;

  return {
    cars,
    user,
  };
}

export default connect(mapToProps)(CarProfile);

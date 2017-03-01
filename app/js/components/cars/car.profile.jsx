import React from 'react';
import { connect } from 'react-redux';
import API from '../../api';
import store from '../../store';
import FavoriteToggle from '../shared/favorite.toggle';

import { STORE_A_POST } from '../../actions/posts';

class CarProfile extends React.Component {
  static fetchCompanies(id) {
    API.fetch(`/automobiles/${id}/`)
      .then((res) => {
        store.dispatch({
          type: STORE_A_POST,
          data: res,
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
        { user.token && <FavoriteToggle postId={ car.id } /> }
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

import React from 'react';
import { connect } from 'react-redux';
import API from '../../api';
import store from '../../store';

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

  render() {
    const { cars } = this.props;
    const car = cars[this.props.params.id];

    return (
      <div>
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
};

function mapToProps(state) {
  const cars = state.entities.posts;

  return {
    cars,
  };
}

export default connect(mapToProps)(CarProfile);

import React from 'react';
import { connect } from 'react-redux';
import API from '../../api';
import store from '../../store';

import { GET_A_CAR } from '../../actions/cars';

class CarProfile extends React.Component {
  static fetchCompanies() {
    API.fetch(window.location.pathname)
      .then((res) => {
        store.dispatch({
          type: GET_A_CAR,
          data: res,
        });
      });
  }

  componentDidMount() {
    CarProfile.fetchCompanies();
  }

  render() {
    const { cars } = this.props;
    const car = cars[this.props.params.id];
    const services = [];

    if (car !== undefined) {
      const keys = Object.keys(car.services);

      keys.forEach((x, i) => {
        services.push(
          <carServices key={ i } name={ x } services={ car.services[x] } />,
        );
      });
    }

    return (
      <div>
        {car && <div>
          <div>
            { car.name }
          </div>
          <div>
            <img src={ car.image } alt={ car.name } />
          </div>
          <div>
            { car.profile_info }
          </div>
          <div>
            { car.phone }
          </div>
          <div>
            { car.address }
          </div>
          <div>
            { services }
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
  const cars = state.entities.users;

  return {
    cars,
  };
}

export default connect(mapToProps)(CarProfile);

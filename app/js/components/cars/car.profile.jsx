import React from 'react';
import { connect } from 'react-redux';
import API from '../../api';
import store from '../../store';
import FavoriteToggle from '../shared/favorite.toggle';
import PromptDelete from '../shared/prompt.delete';

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

  constructor(props) {
    super(props);

    this.onDeleteClick = this.onDeleteClick.bind(this);
    this.onCancelClick = this.onCancelClick.bind(this);

    this.state = {
      showPrompt: false,
    };
  }

  componentDidMount() {
    CarProfile.fetchCompanies(this.props.params.id);
  }

  componentWillUpdate(nextProps) {
    if (nextProps.user.token !== this.props.user.token) {
      CarProfile.fetchCompanies(this.props.params.id);
    }
  }

  onDeleteClick() {
    this.setState({
      showPrompt: true,
    });
  }

  onCancelClick() {
    this.setState({
      showPrompt: false,
    });
  }

  render() {
    const { cars, user } = this.props;
    const { showPrompt } = this.state;
    const car = cars[this.props.params.id];

    return (
      <div>
        { user.token && car && !car.isMy && <FavoriteToggle postId={ car.id } /> }
        { car && car.isMy && <button onClick={ this.onDeleteClick }>Delete</button> }
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
        { showPrompt && <PromptDelete postId={ car.id } cancel={ this.onCancelClick } /> }
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

import React from 'react';
import { Link } from 'react-router';

class Service extends React.Component {
  render() {
    const { service } = this.props;

    return (
      <div className='list__item list__item--service'>
        <Link to={ `/services/${service.id}` } activeStyle={ { textDecoration: 'none' } }>
          <div className='list__item__head' style={ { overflow: 'hidden' } }>
            <h3 className='list__item__service-name'>
              { service.title }
            </h3>
            <img src={ service.image } alt={ service.title } />
          </div>
        </Link>
      </div>
    );
  }
}

Service.PropTypes = {
  service: React.PropTypes.object.isRequired,
};

export default Service;

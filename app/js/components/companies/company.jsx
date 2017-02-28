import React from 'react';
import { Link } from 'react-router';

class Company extends React.Component {
  static renderTypes(types) {
    return types !== undefined ? types.map(type => <span key={ type }>{ type }</span>) : [];
  }

  render() {
    const { company } = this.props;
    const types = company.types;

    return (
      <div className='list__item'>
        <Link to={ `/companies/${company.id}` } activeStyle={ { textDecoration: 'none' } }>
          <div className='list__item__left'>
            <div className='list__item__media'>
              <img src={ company.image } className='list__item__media__img' alt={ company.name } />
            </div>
          </div>
          <div className='list__item__content'>
            <h3 className='list__item__title'>
              { company.name }
            </h3>
            { company.profile_info && <div className='list__item__description'>
              { company.profile_info }
            </div> }
            <div className='list__item__category'>
              { Company.renderTypes(types) }
            </div>
          </div>
        </Link>
      </div>
    );
  }
}

Company.PropTypes = {
  company: React.PropTypes.object.isRequired,
  // companyClickCallback: React.PropTypes.func,
};

export default Company;


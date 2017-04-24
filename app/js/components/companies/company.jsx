import React from 'react';
import { Link } from 'react-router';
import { importImage } from '../../utils';

class Company extends React.Component {
  static renderTypes(types) {
    return types !== undefined ? types.map(type => <span key={ type }>{ type }</span>) : [];
  }

  render() {
    const { company } = this.props;
    const types = company.types;

    return (
      <div className='list__item list__item--company'>
        <Link to={ `/companies/${company.id}` } activeStyle={ { textDecoration: 'none' } }>
          <div className='list__item__left'>
            <div className='list__item__media' ref='image'>
              <img src={ importImage(company.image, this.refs.image) } className='list__item__media__img' alt={ company.name } />
              <div className='list__item__about desktop'>
                <h3 className='list__item__title desktop'>
                  { company.name }
                </h3>
                { company.profile_info && <div className='list__item__description'>
                  { company.profile_info }
                </div> }
              </div>
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


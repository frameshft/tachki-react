import React from 'react';

class Company extends React.Component {
  render() {
    const { company } = this.props;
    const types = company.types;

    return (
      <div className='list__item'>
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
            { types.map(type => <span key={ type }>{ type }</span>) }
          </div>
        </div>
      </div>
    );
  }
}

Company.PropTypes = {
  company: React.PropTypes.object.isRequired,
};

export default Company;

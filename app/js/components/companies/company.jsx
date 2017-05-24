import React from 'react';
import { Link } from 'react-router';
import { importImage } from '../../utils';
import Spinner from '../shared/spinner';

class Company extends React.Component {

  static renderTypes(types) {
    return types !== undefined ? types.map(type => <span key={ type }>{ type }</span>) : [];
  }

  constructor(props) {
    super(props);
    this.onImageLoad = this.onImageLoad.bind(this);
    this.state = { imgLoaded: false };
  }

  componentDidMount() {
    const img = this.node.getBoundingClientRect();
    if (img.complete) {
      this.onImageLoad();
    }
  }

  onImageLoad() {
    if (!this.state.imgLoaded) {
      this.setState({ imgLoaded: true });
    }
  }

  render() {
    const { company } = this.props;
    const types = company.types;

    return (
      <div className='list__item list__item--company'>
        <Link to={ `/companies/${company.slug}` } activeStyle={ { textDecoration: 'none' } }>
          <div className='list__item__left'>
            <div className='list__item__media background-gray' ref='image'>
              {!this.state.imgLoaded && <Spinner /> }
              <img
                src={ importImage(company.image, this.refs.image, 'no-user') }
                className={ `list__item__media__img fade ${this.state.imgLoaded ? 'in static' : 'absolute'}` }
                alt={ company.name }
                onLoad={ this.onImageLoad }
                ref={ (node) => { this.node = node; } }
              />
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

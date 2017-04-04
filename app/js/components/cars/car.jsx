import React from 'react';
import { Link } from 'react-router';
import moment from 'moment';
import { importImage } from '../../utils';


class Car extends React.Component {
  render() {
    const { car } = this.props;

    const isVip = car.isVip;
    const image = importImage(car.image);

    const vipCls = isVip ? 'vip-item' : '';

    return (
      <div className={ `list__item list__item--car ${vipCls}` }>
        <Link to={ `/automobiles/${car.id}` } activeStyle={ { textDecoration: 'none' } }>
          <div className='list__item__left'>
            <div className='list__item__media'>
              <img className='list__item__media__img' src={ image } alt={ car.title } />
              <div className='list__item__media__img-count mobile'>{ car.num_images }</div>
              <div className='list__item__city desktop'>
                { car.city }
              </div>
              { isVip && <div className='vip desktop' /> }
              <div className='list__item__price mobile'>
                { car.price }
              </div>
            </div>
            <h3 className='list__item__name desktop'>
              { car.title }
            </h3>
          </div>

          <div className='list__item__content list__item__content'>
            <h3 className='list__item__name mobile'>
              { car.title }
              { isVip && <div className='vip mobile' /> }
            </h3>
            <div className='list__item__description list__item__description'>
              { car.description }
              <div className='list__item__date mobile'>
                <strong>{ car.city }</strong>&nbsp;{ moment().format('MM.YY.DD, h:mm') }
              </div>
            </div>
            <div className='list__item__price desktop'>
              { car.price }
            </div>
            <div className='list__item__bottom' />
          </div>
        </Link>
      </div>
    );
  }
}

Car.PropTypes = {
  car: React.PropTypes.object.isRequired,
};

export default Car;

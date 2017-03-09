import React from 'react';
import { Link } from 'react-router';
import moment from 'moment';


class Car extends React.Component {
  render() {
    const { car } = this.props;

    const isVip = car.isVip;
    const image = car.image;

    return (
      <div className='list__item list__item--car'>
        <Link to={ `/automobiles/${car.id}` } activeStyle={ { textDecoration: 'none' } }>
          <div className='list__item__head'>
            <h3 className='list__item__car-name'>
              { car.title }
            </h3>
            { isVip && <div className='vip' /> }
          </div>
          <div className='list__item__left list__item__left--cars'>
            {image && <div className='list__item__media list__item__media--cars'>
              <img className='list__item__media__img' src={ image } alt={ car.title } />
              <div className='list__item__media__img-count'>{ car.num_images }</div>
            </div>}
            <div className='list__item__price'>
              { car.price }
            </div>
          </div>

          <div className='list__item__content list__item__content--cars'>
            <div className='list__item__description list__item__description--cars'>
              { car.description }
              <div className='list__item__date'>
                <strong>{ car.city }</strong>&nbsp;{ moment().format('MM.YY.DD, h:mm') }
              </div>
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

import React from 'react';
import moment from 'moment';

export default class extends React.Component {
  static PropTypes= {
    car: React.PropTypes.object.isRequired
  };

  render() {
    const {car} = this.props;

    const isVip = car['is_vip'];
    const image = car.image;

    return (
      <div className="list__item list__item--car">
        <div className="list__item__head">
          <h3 className="list__item__car-name">
            {car.title}
          </h3>
          {isVip && <div className="vip"/>}
        </div>
        <div className="list__item__left list__item__left--cars">
          {image && <div className="list__item__media list__item__media--cars">
            <img className="list__item__media__img" src={image} alt={car.title}/>
            <div className="list__item__media__img-count">{car['num_images']}</div>
          </div>}
          <div className="list__item__price">
            {car.price}
          </div>
        </div>

        <div className="list__item__content list__item__content--cars">
          <div className="list__item__description list__item__description--cars">
            {car.description}
            <div className="list__item__date">
              <strong>{car.city}</strong>&nbsp;{moment().format('MM.YY.DD, h:mm')}
            </div>
          </div>
          <div className="list__item__bottom">

          </div>
        </div>
      </div>
    )
  }
}
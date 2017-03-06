import React from 'react';
import moment from 'moment';

class SparePart extends React.Component {
  render() {
    const { part } = this.props;

    const isVip = part.is_vip;
    const image = part.image;

    return (
      <div className='spare-part'>
        <div className='spare-part__head'>
          <h3 className='spare-part__name'>
            { part.title }
          </h3>
          { isVip && <div className='vip' /> }
        </div>
        <div className='spare-part__left'>
          {image && <div className='spare-part__media'>
            <img className='list__item__media__img' src={ image } alt={ part.title } />
          </div>}
          <div className='spare-part__price'>
            {part.price}
          </div>
        </div>
        <div className='spare-part__head-bottom'>
          <h3 className='spare-part__name'>
            { part.title }
          </h3>
          { isVip && <div className='vip' /> }
        </div>

        <div className='spare-part__content'>
          <div className='spare-part__description'>
            { part.description }
            <div className='spare-part__date'>
              <strong>{ part.city }</strong>&nbsp;{ moment().format('MM.YY.DD, h:mm') }
            </div>
          </div>
          <div className='spare-part__category'>
            { part.category }
          </div>
          <div className='spare-part__bottom'>
            <div className='spare-part__viewed'>
              { part.num_views }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

SparePart.PropTypes = {
  part: React.PropTypes.object.isRequired,
};

export default SparePart;

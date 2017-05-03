import React from 'react';
import Slider from 'react-slick';

export default class extends React.Component {
  getImageDimensions(image) {
    if (!image) return { width: '-', height: '-' };
    return {
      width: image.offsetWidth,
      height: image.offsetHeight,
    };
  }

  render() {
    const settings = {
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      lazyLoad: true,
      focusOnSelect: true,
    };
    const { images, title, refImage } = this.props;
    const { width, height } = this.getImageDimensions(refImage);
    return (
      <Slider { ...settings }>
        { images.map((x, i) => <div key={ i }><img className='slick-slide-image' src={ `${x}?w=${width}&h=${height}` } alt={ title } /></div>) }
      </Slider>
    );
  }
}

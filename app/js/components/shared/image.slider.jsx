import React from 'react';
import Slider from 'react-slick';
import Img from '../shared/Img';

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
    const imgTitle = title.toString();
    return (
      <Slider { ...settings }>
        { images.map((x, i) => <div key={ i }><Img imgClasses='slick-slide-image' src={ `${x}?w=${width}&h=${height}` } alt={ imgTitle } /></div>) }
      </Slider>
    );
  }
}

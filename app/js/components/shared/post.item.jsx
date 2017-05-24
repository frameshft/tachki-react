import React from 'react';
import { Link } from 'react-router';
import moment from 'moment';
import { importImage } from '../../utils';
import Spinner from '../shared/spinner';

class PostItem extends React.Component {
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

  formatPrice(price, separator = ' ') {
    let output = (price) ? price.toString() : '';
    output = output.replace(/[^0-9]+/g, '')
      .replace(new RegExp(`^(\\d{${(output.length % 3 ? output.length % 3 : 0)}})(\\d{3})`, 'g'), '$1 $2')
      .replace(/(\d{3})+?/gi, '$1 ')
      .trim();
    output = output.replace(/\s/g, separator);
    return output;
  }

  render() {
    const { post } = this.props;
    let { endpoint } = this.props;
    if (!post) return null;

    const isVip = post.isVip;

    const vipCls = isVip ? 'vip-item' : '';
    const images = post.images || [];
    images.reverse();
    const image = post.image || (images.length > 0 && images[0]);

    let pricePre = '';

    switch (post.postType) {
      case 'automobile':
        endpoint = `${endpoint}${post.categorySlug}/${post.brand}/${post.model}/`;
        break;
      case 'spare':
      case 'service':
        pricePre = 'От ';
        endpoint = `${endpoint}${post.categorySlug}/`;
        break;
      case 'cargo':
        endpoint = `${endpoint}${post.categorySlug}/`;
        break;
      default:
        break;
    }

    return (
      <div className={ `list__item list__item--car ${vipCls}` }>
        <Link to={ `${endpoint}${post.id}` } activeStyle={ { textDecoration: 'none' } }>
          <h3 className='list__item__name small-view'>
            { post.title }
            <div className='vip mobile' />
          </h3>
          <div className='list__item__left'>
            <div className='list__item__media background-gray' ref='postItem'>
              {!this.state.imgLoaded && <Spinner /> }
              <img
                className={ `list__item__media__img fade ${this.state.imgLoaded ? 'in static' : 'absolute'}` }
                src={ importImage(image, this.refs.postItem) } alt={ post.title }
                onLoad={ this.onImageLoad }
                ref={ (node) => { this.node = node; } }
              />
              <div className='list__item__media__img-count mobile'>{ post.num_images }</div>
              <div className='list__item__city desktop'>
                { post.city }
              </div>
              { isVip && <div className='vip desktop' /> }
              <div className='list__item__price mobile'>
                { pricePre } { this.formatPrice(post.price) } сом
              </div>
            </div>
            <h3 className='list__item__name desktop'>
              { post.title }
            </h3>
            <div className='list__item__price small-view'>
              { pricePre } { this.formatPrice(post.price) } сом
            </div>
          </div>

          <div className='list__item__content list__item__content'>
            <h3 className='list__item__name mobile'>
              { post.title }
              { isVip && <div className='vip mobile' /> }
            </h3>
            <div className='list__item__description list__item__description'>
              { post.description }
              <div className='list__item__date mobile'>
                <strong>{ post.city }</strong>&nbsp;{ moment().format('DD.MM.YY') }
              </div>
            </div>
            <div className='list__item__price desktop'>
              { pricePre } { this.formatPrice(post.price) } сом
            </div>
            <div className='list__item__bottom' />
          </div>
        </Link>
      </div>
    );
  }
}

PostItem.PropTypes = {
  post: React.PropTypes.object.isRequired,
  endpoint: React.PropTypes.string.isRequired,
};

export default PostItem;

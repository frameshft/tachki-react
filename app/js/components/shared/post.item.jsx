import React from 'react';
import { Link } from 'react-router';
import moment from 'moment';
import { importImage } from '../../utils';


class PostItem extends React.Component {
  render() {
    const { post, endpoint } = this.props;
    if (!post) return null;

    const isVip = post.isVip;

    const vipCls = isVip ? 'vip-item' : '';

    return (
      <div className={ `list__item list__item--car ${vipCls}` }>
        <Link to={ `${endpoint}/${post.id}` } activeStyle={ { textDecoration: 'none' } }>
          <h3 className='list__item__name small-view'>
            { post.title }
          </h3>
          <div className='list__item__left aaa'>
            <div className='list__item__media' ref='postItem'>
              <img className='list__item__media__img' src={ importImage(post.image, this.refs.postItem) } alt={ post.title } />
              <div className='list__item__media__img-count mobile'>{ post.num_images }</div>
              <div className='list__item__city desktop'>
                { post.city }
              </div>
              { isVip && <div className='vip desktop' /> }
              <div className='list__item__price mobile'>
                { post.price } сом
              </div>
            </div>
            <h3 className='list__item__name desktop'>
              { post.title }
            </h3>
            <div className='list__item__price small-view'>
              { post.price } сом
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
                <strong>{ post.city }</strong>&nbsp;{ moment().format('MM.YY.DD, h:mm') }
              </div>
            </div>
            <div className='list__item__price desktop'>
              { post.price } сом
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

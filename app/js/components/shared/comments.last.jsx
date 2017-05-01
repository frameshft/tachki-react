import React from 'react';
import { Link } from 'react-router';
import moment from 'moment';

class LastCommentsPost extends React.Component {
  renderLastComment(comment) {
    if (!comment) return null;

    return (
      <div>
        <div className='car-profile__comments__top'>
          <div className='car-profile__comments__media'>
            <img src={ comment.image } alt={ comment.name } />
          </div>
          <div className='car-profile__comments__user'>
            { comment.name }
            <div className='car-profile__comments__date'>
              { moment(comment.created).format('YYYY.MM.DD hh:mm') }
            </div>
          </div>
        </div>
        <div className='car-profile__comments__text'>
          { comment.description }
        </div>
      </div>
    );
  }

  render() {
    const { post, isAuthenticated } = this.props;
    if (!post || !post.lastComment) return null;

    return (
      <div className='car-profile__comments'>
        { this.renderLastComment(post.lastComment) }
        {isAuthenticated && <Link to={ `/comments/${post.id}` } className='car-profile__comments__all'>
          Комментарии: { post.commentsCount }
        </Link>}
      </div>
    );
  }
}

LastCommentsPost.PropTypes = {
  post: React.PropTypes.object.isRequired,
  isAuthenticated: React.PropTypes.bool.isRequired,
};

export default LastCommentsPost;

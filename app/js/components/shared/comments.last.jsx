import React from 'react';
import { Link } from 'react-router';

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
              { comment.created }
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
    const { post } = this.props;
    if (!post) return null;

    return (
      <div className='car-profile__comments'>
        { this.renderLastComment(post.lastComment) }
        <Link to={ `/comments/${post.id}` } className='car-profile__comments__all'>
          Комментарии: { post.commentsCount }
        </Link>
      </div>
    );
  }
}

LastCommentsPost.PropTypes = {
  post: React.PropTypes.object.isRequired,
};

export default LastCommentsPost;

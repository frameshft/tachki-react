import React from 'react';
import { connect } from 'react-redux';
import { markPostAsFavorite, unMarkPostAsFavorite } from '../../actions/posts';
import store from '../../store';

class FavoriteToggle extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);

    this.state = {
      post: this.props.posts[this.props.postId],
    };
  }

  componentWillUpdate(nextProps) {
    const post = nextProps.posts[nextProps.postId];
    if (post.isFavorite !== this.state.post.isFavorite) {
      this.state.post.isFavorite = post.isFavorite;
    }
  }

  onClick() {
    if (this.state.post.isFavorite) {
      store.dispatch(unMarkPostAsFavorite(this.state.post.id));
    } else {
      store.dispatch(markPostAsFavorite(this.state.post.id));
    }
  }

  render() {
    const cls = this.state.post.isFavorite ? 'header__tools__btn--bookmark' : 'header__tools__btn--bookmarked';
    return (
      <button onClick={ this.onClick } className={ `header__tools__btn ${cls}` } />
    );
  }
}

FavoriteToggle.PropTypes = {
  postId: React.PropTypes.number.isRequired,
  posts: React.PropTypes.object.isRequired,
};

function mapToProps(state) {
  const posts = state.entities.posts;
  return {
    posts,
  };
}

export default connect(mapToProps)(FavoriteToggle);

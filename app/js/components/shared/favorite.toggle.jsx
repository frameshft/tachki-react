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
    const label = this.state.post.isFavorite ? 'Unmark as favorite' : 'Mark as favorite';
    return (
      <button onClick={ this.onClick }>{ label }</button>
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

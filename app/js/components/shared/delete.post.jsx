import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { deletePost } from '../../actions/posts';
import store from '../../store';

class DeletePost extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);

    this.state = {
      post: this.props.posts[this.props.postId],
    };
  }

  onClick() {
    store.dispatch(deletePost(this.state.post.id))
      .then(() => browserHistory.push('/my/posts'));
  }

  render() {
    return (
      <button onClick={ this.onClick }>Delete post</button>
    );
  }
}

DeletePost.PropTypes = {
  postId: React.PropTypes.number.isRequired,
  posts: React.PropTypes.object.isRequired,
};

function mapToProps(state) {
  const posts = state.entities.posts;
  return {
    posts,
  };
}

export default connect(mapToProps)(DeletePost);

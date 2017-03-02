import React from 'react';
import { connect } from 'react-redux';
import { votePostUp } from '../../actions/posts';
import store from '../../store';

class UpPost extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);

    this.state = {
      post: this.props.posts[this.props.postId],
    };
  }

  onClick() {
    store.dispatch(votePostUp(this.state.post.id));
  }

  render() {
    return (
      <button onClick={ this.onClick }>Up</button>
    );
  }
}

UpPost.PropTypes = {
  postId: React.PropTypes.number.isRequired,
  posts: React.PropTypes.object.isRequired,
};

function mapToProps(state) {
  const posts = state.entities.posts;
  return {
    posts,
  };
}

export default connect(mapToProps)(UpPost);

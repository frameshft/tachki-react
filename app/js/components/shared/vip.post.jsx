import React from 'react';
import { connect } from 'react-redux';
import { makePostVIP } from '../../actions/posts';
import store from '../../store';

class VipPost extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);

    this.state = {
      post: this.props.posts[this.props.postId],
    };
  }

  onClick() {
    store.dispatch(makePostVIP(this.state.post.id));
  }

  render() {
    return (
      <button onClick={ this.onClick }>make VIP</button>
    );
  }
}

VipPost.PropTypes = {
  postId: React.PropTypes.number.isRequired,
  posts: React.PropTypes.object.isRequired,
};

function mapToProps(state) {
  const posts = state.entities.posts;
  return {
    posts,
  };
}

export default connect(mapToProps)(VipPost);

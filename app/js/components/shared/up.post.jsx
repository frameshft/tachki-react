import React from 'react';
import { connect } from 'react-redux';
import BtnUp from './up.post.btn';
import BtnVip from './vip.post.btn';

class UpPost extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      post: props.posts[this.props.params.id],
    };
  }

  render() {
    const { post } = this.state;

    return (
      <div>
        <BtnUp post={ post } />
        <BtnVip post={ post } />
      </div>
    );
  }
}

UpPost.propTypes = {
  posts: React.PropTypes.object.isRequired,
};

function mapToProps(state) {
  const posts = state.entities.posts;

  return {
    posts,
  };
}

export default connect(mapToProps)(UpPost);

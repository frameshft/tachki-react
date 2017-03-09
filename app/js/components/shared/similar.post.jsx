import React from 'react';
import API from '../../api';

class SimilarPosts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
    };
  }

  componentDidMount() {
    const { post } = this.props;

    API.fetch(`/posts/${post.id}/similar/`)
      .then(posts => this.setState({ posts }));
  }

  render() {
    const { posts } = this.state;
    const renderPosts = posts.map(post => <li key={ post.id }>{ post.id } - { post.title }</li>);

    return (
      <div>
        <h2>Похожие объявления</h2>
        <ul>{ renderPosts }</ul>
      </div>
    );
  }
}

SimilarPosts.PropTypes = {
  post: React.PropTypes.object.isRequired,
};

export default SimilarPosts;

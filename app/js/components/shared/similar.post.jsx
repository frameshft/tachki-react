import React from 'react';
import API from '../../api';
import { getPostComponent } from './utils';

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

  listPosts(posts) {
    if (!posts) {
      return [];
    }
    return posts.map(x => getPostComponent(x));
  }

  renderPosts(posts) {
    const myPosts = this.listPosts(posts);
    if (myPosts.length < 1) return null;
    return (
      <div className='company-posts'>
        <h3 className='company-posts__title'>Похожие объявления</h3>
        <div className='company-posts__list'>{ myPosts }</div>
      </div>
    );
  }

  render() {
    const { posts } = this.state;
    return this.renderPosts(posts);
  }
}

SimilarPosts.PropTypes = {
  post: React.PropTypes.object.isRequired,
};

export default SimilarPosts;

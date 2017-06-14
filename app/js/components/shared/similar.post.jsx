import React from 'react';
import API from '../../api';
import { getPostComponent } from './utils';

import Spinner from '../shared/spinner';

class SimilarPosts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      isFetching: true,
    };
  }

  componentDidMount() {
    const { post } = this.props;
    API.fetch(`/posts/${post.id}/similar/`)
      .then((posts) => {
        const wut = posts.map(pos => API.fetch(`/automobiles/${pos.id}/`).then(res => res));
        Promise.all(wut).then(res => this.setState({ posts: res, isFetching: false }));
      });
  }

  listPosts(posts) {
    if (!posts) {
      return [];
    }
    return posts.map(x => getPostComponent(x)).filter(x => !!x);
  }

  renderPosts(posts) {
    const myPosts = this.listPosts(posts);

    console.log(this.state.posts);
    if (myPosts.length < 1) return null;
    return (
      <div className='company-posts'>
        <h3 className='company-posts__title'>Похожие объявления</h3>
        <div className='company-posts__list'>{ myPosts }</div>
      </div>
    );
  }

  render() {
    const { posts, isFetching } = this.state;
    if (isFetching) {
      return <Spinner />;
    }
    return this.renderPosts(posts);
  }
}

SimilarPosts.PropTypes = {
  post: React.PropTypes.object.isRequired,
};

export default SimilarPosts;

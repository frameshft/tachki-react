import React from 'react';
import API from '../../api';
import { getPostComponent, getEndponit } from './utils';

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
    // Get incomplete similar posts objects
    API.fetch(`/posts/${post.id}/similar/`)
      .then((posts) => {
        // Fetch complete posts objects based on the endpoint and id into a new array
        // If unsuccesfull store as a null
        const fetchedPosts = posts.map(p => API.fetch(`${getEndponit(p.postType)}${p.id}/`).then(res => res).catch(() => null));
        // Wait until all posts are fetched, then filter out the nulls and store only the successfully fetched posts.
        Promise.all(fetchedPosts).then(res => this.setState({ posts: res.filter(i => i !== null), isFetching: false }));
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

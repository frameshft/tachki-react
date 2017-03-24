import React from 'react';
import { connect } from 'react-redux';
import store from '../../store';
import { fetchPaginatedResponse } from '../../actions/list';

import Pagination from '../shared/pagination';
import { GET_COMPANY_POSTS } from '../../actions/companies';
import { STORE_A_POST } from '../../actions/posts';
import { getPostComponent } from '../shared/utils';

class CompanyPosts extends React.Component {
  constructor(props) {
    super(props);

    this.onNextPageClick = this.onNextPageClick.bind(this);
    this.onPrevPageClick = this.onPrevPageClick.bind(this);

    this.state = {
      currentPage: 1,
    };
  }

  componentDidMount() {
    this.fetchPosts();
  }

  onNextPageClick() {
    const { currentPage } = this.state;
    this.setState({
      currentPage: currentPage + 1,
    });

    setTimeout(() => {
      this.fetchPosts();
    }, 0);
  }

  onPrevPageClick() {
    const { currentPage } = this.state;
    this.setState({
      currentPage: currentPage - 1,
    });

    setTimeout(() => {
      this.fetchPosts();
    }, 0);
  }

  fetchPosts() {
    const { company } = this.props;
    const { currentPage } = this.state;

    store.dispatch(fetchPaginatedResponse({
      entities: STORE_A_POST,
      component: GET_COMPANY_POSTS,
    }, `/companies/${company.id}/posts/`, currentPage));
  }

  render() {
    const { posts, totalPages } = this.props;
    const { currentPage } = this.state;

    const paginationProps = {
      totalPages,
      view: 'companies',
      currentPage,
      onNext: this.onNextPageClick,
      onPrev: this.onPrevPageClick,
    };

    if (posts.length < 1) return null;
    return (
      <div className='company-posts'>
        <h3 className='company-posts__title'>Объявления компании</h3>
        <Pagination { ...paginationProps } />
        <div className='company-posts__list'>{ posts.map(x => getPostComponent(x)) }</div>
      </div>
    );
  }
}

CompanyPosts.propTypes = {
  company: React.PropTypes.object.isRequired,
  posts: React.PropTypes.array.isRequired,
};

function mapToProps(state) {
  const companyPosts = state.views.companyPosts.list;
  const totalPages = state.views.companyPosts.totalPages;
  let posts = state.entities.posts;

  posts = companyPosts.map(x => posts[x]);

  return {
    posts,
    totalPages,
  };
}

export default connect(mapToProps)(CompanyPosts);

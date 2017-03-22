import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import store from '../../store';
import * as listViewType from '../../constants/listView';
import { fetchPaginatedResponse, SUCCESS_FETCH_MY_POSTS_LIST, FETCH_MY_POSTS_LIST } from '../../actions/list';

import { getPostComponent } from '../shared/utils';
import Pagination from '../shared/pagination';
import { STORE_A_POST } from '../../actions/posts';

class MyPostsList extends React.Component {
  componentDidMount() {
    if (this.props.user.token !== undefined) {
      store.dispatch(fetchPaginatedResponse({
        entities: STORE_A_POST,
        component: SUCCESS_FETCH_MY_POSTS_LIST,
        fetching: FETCH_MY_POSTS_LIST,
      }, '/my/posts', this.props.currentPage, true));
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user.token === undefined) {
      browserHistory.push('/sign-in');
    } else if (!nextProps.posts.isFetched || nextProps.currentPage !== this.props.currentPage) {
      store.dispatch(fetchPaginatedResponse({
        entities: STORE_A_POST,
        component: SUCCESS_FETCH_MY_POSTS_LIST,
        fetching: FETCH_MY_POSTS_LIST,
      }, '/my/posts', nextProps.currentPage, true));
    }
  }

  render() {
    const { listView, currentPage, posts, entities } = this.props;

    const listsCls = (listView === listViewType.LIST_VIEW_NORMAL) ? '' : ' list--small';
    const postsRender = [];

    if (posts.list.length > 0) {
      posts.list.forEach((i) => {
        if (entities[i] !== undefined) {
          const post = getPostComponent(entities[i]);
          if (post !== null) {
            postsRender.push(post);
          }
        }
      });
    }

    const paginationProps = {
      totalPages: posts.totalPages,
      view: 'my/posts',
      currentPage,
    };

    return (
      <div className='body companies'>
        <div className={ `list${listsCls}` }>
          { postsRender }
        </div>
        <Pagination { ...paginationProps } />
      </div>
    );
  }
}

MyPostsList.propTypes = {
  listView: React.PropTypes.number.isRequired,
  // user: React.PropTypes.object.isRequired,
  entities: React.PropTypes.object.isRequired,
  posts: React.PropTypes.object.isRequired,
  currentPage: React.PropTypes.number.isRequired,
};

function mapToProps(state) {
  let currentPage = state.routing.locationBeforeTransitions.query.page;
  currentPage = currentPage !== undefined ? +currentPage : 1;

  return {
    entities: state.entities.posts,
    posts: state.views.myPosts,
    user: state.auth.user,
    listView: state.views.listView,
    currentPage,
  };
}

export default connect(mapToProps)(MyPostsList);

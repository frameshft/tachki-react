import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import store from '../../store';
import * as listViewType from '../../constants/listView';
import { fetchPaginatedResponse, SUCCESS_FETCH_MY_FAVORITE_POSTS, FETCH_MY_FAVORITE_POSTS } from '../../actions/list';

import Car from '../cars/car';
import SparePart from '../spare-parts/sparePart';
import Pagination from '../shared/pagination';
import { STORE_A_POST } from '../../actions/posts';

class FavoritePosts extends React.Component {
  static getPostComponent(item) {
    switch (item.post_type) {
      // TODO: add services and cargo
      case 'sparepart':
        return (<SparePart key={ item.id } car={ item } />);
      default:
        return (<Car key={ item.id } car={ item } />);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user.token === undefined) {
      browserHistory.push('/sign-in');
    } else if (!nextProps.posts.isFetched || nextProps.currentPage !== this.props.currentPage) {
      store.dispatch(fetchPaginatedResponse({
        entities: STORE_A_POST,
        component: SUCCESS_FETCH_MY_FAVORITE_POSTS,
        fetching: FETCH_MY_FAVORITE_POSTS,
      }, '/my/favorites', nextProps.currentPage, true));
    }
  }

  render() {
    const { listView, currentPage, posts, entities } = this.props;

    const listsCls = (listView === listViewType.LIST_VIEW_NORMAL) ? '' : ' list--small';
    const postsRender = [];

    if (posts.list.length > 0) {
      posts.list.forEach((i) => {
        const post = FavoritePosts.getPostComponent(entities[i]);
        postsRender.push(post);
      });
    }

    const paginationProps = {
      totalPages: posts.totalPages,
      view: 'my/favorites',
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

FavoritePosts.propTypes = {
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
    posts: state.views.favorites,
    user: state.auth.user,
    listView: state.views.listView,
    currentPage,
  };
}

export default connect(mapToProps)(FavoritePosts);

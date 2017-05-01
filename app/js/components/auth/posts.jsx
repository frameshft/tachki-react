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
    store.dispatch(fetchPaginatedResponse({
      entities: STORE_A_POST,
      component: SUCCESS_FETCH_MY_POSTS_LIST,
      fetching: FETCH_MY_POSTS_LIST,
    }, '/my/posts/', this.props.currentPage, true));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user.token === undefined) {
      browserHistory.push('/');
    } else if (!nextProps.posts.isFetched || nextProps.currentPage !== this.props.currentPage) {
      store.dispatch(fetchPaginatedResponse({
        entities: STORE_A_POST,
        component: SUCCESS_FETCH_MY_POSTS_LIST,
        fetching: FETCH_MY_POSTS_LIST,
      }, '/my/posts/', nextProps.currentPage, true));
    }
  }

  render() {
    const { listView, currentPage, posts, entities, user } = this.props;
    if (user.token === undefined) {
      return null;
    }

    const listsCls = (listView === listViewType.LIST_VIEW_NORMAL) ? '' : ' list--small';
    const postsRender = [];

    if (posts.list.length > 0) {
      posts.list.forEach((i) => {
        if (entities[i] !== undefined) {
          const post = getPostComponent(entities[i]);
          if (post) {
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

    const renderer = postsRender.length > 0 ?
      postsRender :
      (<div className='no-posts'>
        <div className='no-posts__title'>У вас нет объявлений</div>
        {/* <div className='no-posts__body'>Может быть вы хотите создать объявление?</div>
        <Link to='/automobiles' className='btn btn--primary'>
          Создать объявление
        </Link> */}
      </div>);

    return (
      <div className='body companies'>
        <div className={ `list${listsCls}` }>
          { renderer }
        </div>
        {/* FIXME: Adilet, сделай красивее, слишком много if else */}
        { postsRender.length > 0 && <Pagination { ...paginationProps } /> }
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

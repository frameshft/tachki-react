import React from 'react';
import { connect } from 'react-redux';
import store from '../../store';
import * as listViewType from '../../constants/listView';
import { fetchPaginatedResponse, SUCCESS_FETCH_MY_POSTS_LIST } from '../../actions/list';

import Car from '../cars/car';
import SparePart from '../spare-parts/sparePart';
import Pagination from '../shared/pagination';

class MyPostsList extends React.Component {
  static getPostComponent(item) {
    switch (item.post_type) {
      // TODO: add services and cargo
      case 'sparepart':
        return (<SparePart key={ item.key } car={ item } />);
      default:
        return (<Car key={ item.key } car={ item } />);
    }
  }

  componentWillReceiveProps(nextProps) {
    const l1 = Object.keys(nextProps.user.posts.list).length;
    const l2 = Object.keys(this.props.user.posts.list).length;
    if (l1 !== l2 || nextProps.currentPage !== this.props.currentPage
      || this.props.user.token !== nextProps.user.token) {
      store.dispatch(fetchPaginatedResponse(SUCCESS_FETCH_MY_POSTS_LIST, '/my/posts', nextProps.currentPage, true));
    }
  }

  render() {
    const { user, listView, currentPage } = this.props;

    const posts = user.posts;

    const listsCls = (listView === listViewType.LIST_VIEW_NORMAL) ? '' : ' list--small';
    const postsRender = [];

    if (posts.ordering[this.props.currentPage] !== undefined) {
      posts.ordering[this.props.currentPage].forEach((i) => {
        const post = MyPostsList.getPostComponent(posts.list[i]);
        postsRender.push(post);
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
  user: React.PropTypes.object.isRequired,
  currentPage: React.PropTypes.number.isRequired,
};

function mapToProps(state) {
  const listView = state.listView.listView;
  let currentPage = state.routing.locationBeforeTransitions.query.page;
  currentPage = currentPage !== undefined ? +currentPage : 1;

  return {
    user: state.auth.user,
    listView,
    currentPage,
  };
}

export default connect(mapToProps)(MyPostsList);

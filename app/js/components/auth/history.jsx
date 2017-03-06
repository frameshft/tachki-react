import React from 'react';
import { connect } from 'react-redux';
import * as listViewType from '../../constants/listView';

import store from '../../store';
import Car from '../cars/car';
import SparePart from '../spare-parts/part';
import { CLEAR_HISTORY_POST } from '../../actions/list';

class HistoryPosts extends React.Component {
  // TODO add clear history action

  static getPostComponent(item) {
    switch (item.post_type) {
      // TODO: add services and cargo
      case 'sparepart':
        return (<SparePart key={ item.id } part={ item } />);
      default:
        return (<Car key={ item.id } car={ item } />);
    }
  }

  clearPage() {
    store.dispatch({ type: CLEAR_HISTORY_POST });
  }

  render() {
    const { listView, posts, entities } = this.props;

    const listsCls = (listView === listViewType.LIST_VIEW_NORMAL) ? '' : ' list--small';
    const postsRender = [];

    if (posts.length > 0) {
      posts.forEach((i) => {
        if (entities[i] !== undefined) {
          const post = HistoryPosts.getPostComponent(entities[i]);
          postsRender.push(post);
        }
      });
    }

    return (
      <div className='body companies'>
        <div>
          <button onClick={ this.clearPage }>Очистить</button>
        </div>
        <div className={ `list${listsCls}` }>
          { postsRender }
        </div>
      </div>
    );
  }
}

HistoryPosts.propTypes = {
  listView: React.PropTypes.number.isRequired,
  entities: React.PropTypes.object.isRequired,
  posts: React.PropTypes.array.isRequired,
};

function mapToProps(state) {
  return {
    entities: state.entities.posts,
    posts: state.views.history.list,
    listView: state.views.listView,
  };
}

export default connect(mapToProps)(HistoryPosts);

import React from 'react';
import { connect } from 'react-redux';
import * as listViewType from '../../constants/listView';

import store from '../../store';
import { getPostComponent } from '../shared/utils';
import { CLEAR_HISTORY_POST } from '../../actions/list';

class HistoryPosts extends React.Component {
  clearPage() {
    store.dispatch({ type: CLEAR_HISTORY_POST });
  }

  render() {
    const { listView, posts } = this.props;

    const listsCls = (listView === listViewType.LIST_VIEW_NORMAL) ? '' : ' list--small';
    const postsRender = posts.map(p => getPostComponent(p));

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
  posts: React.PropTypes.array.isRequired,
};

function mapToProps(state) {
  const entities = state.entities.posts;
  const ids = state.views.history.list;
  const posts = ids.map(x => entities[x]);

  return {
    posts,
    listView: state.views.listView,
  };
}

export default connect(mapToProps)(HistoryPosts);

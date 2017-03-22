import React from 'react';
import { connect } from 'react-redux';
import * as listViewType from '../../constants/listView';

import store from '../../store';
import { getPostComponent } from '../shared/utils';
import { CLEAR_HISTORY_POST } from '../../actions/list';

class HistoryPosts extends React.Component {
  // TODO add clear history action

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
          const post = getPostComponent(entities[i]);
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

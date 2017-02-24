import React from 'react';
import { connect } from 'react-redux';
import store from '../../store';

import * as listViewType from '../../constants/listView';
import SparePart from './sparePart';
import Pagination from '../shared/pagination';
import { fetchPaginatedResponse, SUCCESS_SPARE_PARTS_LIST } from '../../actions/list';
import { STORE_A_POST } from '../../actions/posts';

class PartsList extends React.Component {
  componentDidMount() {
    store.dispatch(fetchPaginatedResponse({
      entities: STORE_A_POST,
      component: SUCCESS_SPARE_PARTS_LIST,
    }, '/spare-parts', this.props.currentPage));
  }

  componentDidUpdate(prevProps) {
    if (prevProps.currentPage !== this.props.currentPage) {
      store.dispatch(fetchPaginatedResponse({
        entities: STORE_A_POST,
        component: SUCCESS_SPARE_PARTS_LIST,
      }, '/spare-parts', this.props.currentPage));
    }
  }

  render() {
    const { listView, parts, currentPage, entities } = this.props;

    const paginationProps = {
      totalPages: parts.totalPages,
      view: 'spare-parts',
      currentPage,
    };

    const render = [];

    if (parts.list.length > 0) {
      parts.list.forEach((i) => {
        const item = entities[i];
        render.push(<SparePart key={ item.id } part={ item } />);
      });
    }

    const listsCls = (listView === listViewType.LIST_VIEW_NORMAL) ? '' : ' list--small';

    return (
      <div className='body companies'>
        <div className={ `list${listsCls}` }>
          { render }
        </div>
        <Pagination { ...paginationProps } />
      </div>
    );
  }
}

PartsList.PropTypes = {
  listView: React.PropTypes.number.isRequired,
  parts: React.PropTypes.object.isRequired,
  currentPage: React.PropTypes.number.isRequired,
};


function mapToProps(state) {
  let currentPage = state.routing.locationBeforeTransitions.query.page;
  currentPage = currentPage !== undefined ? +currentPage : 1;

  return {
    entities: state.entities.posts,
    parts: state.views.spareParts,
    listView: state.views.listView,
    currentPage,
  };
}

export default connect(mapToProps)(PartsList);

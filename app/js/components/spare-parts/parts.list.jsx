import React from 'react';
import { connect } from 'react-redux';
import store from '../../store';
import API from '../../api';
import { FETCH_SPARE_PARTS_LIST } from '../../actions/spareParts';

import * as listViewType from '../../constants/listView';
import SparePart from './sparePart';
import Pagination from '../shared/pagination';

class PartsList extends React.Component {

  static fetchList(page = 1) {
    API.fetch(`/spare-parts/?page=${page}`)
      .then((res) => {
        const data = {
          ...res,
          currentPage: page,
        };
        store.dispatch({
          type: FETCH_SPARE_PARTS_LIST,
          data,
        });
      });
  }

  componentDidMount() {
    PartsList.fetchList(this.props.currentPage);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.currentPage !== this.props.currentPage) {
      PartsList.fetchList(this.props.currentPage);
    }
  }

  render() {
    const { listView, parts, currentPage } = this.props;

    const paginationProps = {
      totalPages: parts.totalPages,
      view: 'spare-parts',
      currentPage,
    };

    const render = [];

    if (parts.ordering[this.props.currentPage] !== undefined) {
      parts.ordering[this.props.currentPage].forEach((i) => {
        const item = parts.list[i];
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
  const listView = state.listView.listView;
  let currentPage = state.routing.locationBeforeTransitions.query.page;
  currentPage = currentPage !== undefined ? +currentPage : 1;

  return {
    parts: state.spareParts,
    listView,
    currentPage,
  };
}

export default connect(mapToProps)(PartsList);

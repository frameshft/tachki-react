import React from 'react';
import { connect } from 'react-redux';
import store from '../../store';
import API from '../../api';
import { FETCH_SPARE_PARTS_LIST } from '../../actions/spareParts';

import * as listViewType from '../../constants/listView';
import SparePart from './sparePart';
// import Pagination from '../shared/pagination';

class PartsList extends React.Component {

  static fetchList(page = 1) {
    API.fetch(`/spare-parts/?page=${page}`)
      .then((res) => {
        store.dispatch({
          type: FETCH_SPARE_PARTS_LIST,
          data: res,
        });
      });
  }

  componentDidMount() {
    PartsList.fetchList();
  }

  render() {
    const { listView, parts } = this.props;

    const render = [];

    if (parts.status === 1) {
      parts.ordering.forEach((i) => {
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
      </div>
    );
  }
}

PartsList.PropTypes = {
  listView: React.PropTypes.number.isRequired,
  parts: React.PropTypes.object.isRequired,
};


function mapToProps(state) {
  const listView = state.listView.get('listView');
  return {
    parts: state.spareParts,
    listView,
  };
}

export default connect(mapToProps)(PartsList);

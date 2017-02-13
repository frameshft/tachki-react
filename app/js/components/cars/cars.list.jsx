import React from 'react';
import {connect} from 'react-redux';

import * as listViewType from '../../constants/listView';

class CarList extends React.Component {
  render() {
    const {listView} = this.props;

    const listsCls = (listView === listViewType.LIST_VIEW_NORMAL) ? "" : " list--small";

    return (
      <div className="body companies">
        <div className={"list" + listsCls}>
          cars
        </div>
      </div>
    )
  }
}

function mapToProps(state) {
  const listView = state.listView.get('listView');
  return {
    cars: state.cars,
    listView,
  };
}

export default connect(mapToProps)(CarList);
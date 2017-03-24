import React from 'react';
import { connect } from 'react-redux';
import store from '../../store';
import LIST_VIEW_TYPE from '../../actions/listView';
import * as listViewType from '../../constants/listView';

class ListViewToggle extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    const { listView } = this.props;
    const data = +(listView === listViewType.LIST_VIEW_NORMAL);

    store.dispatch({
      type: LIST_VIEW_TYPE,
      data,
    });
  }

  render() {
    const { listView } = this.props;
    const listViewIconCls = (listView === listViewType.LIST_VIEW_NORMAL)
      ? ' header__tools__btn--view--big' : ' header__tools__btn--view--small';

    return (
      <button className={ `header__tools__btn header__tools__btn--view${listViewIconCls}` } onClick={ this.onClick } />
    );
  }
}

function mapToProps(state) {
  const listView = state.views.listView;
  return {
    listView,
  };
}

export default connect(mapToProps)(ListViewToggle);

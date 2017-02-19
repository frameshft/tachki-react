/* eslint-disable jsx-a11y/no-static-element-interactions,jsx-a11y/anchor-has-content */

import React from 'react';
import { connect } from 'react-redux';
import store from '../../store';
import Sidebar from './sidebar';
import { LIST_VIEW_TYPE } from '../../actions/listView';
import * as listViewType from '../../constants/listView';

import '../../../style/_header.scss';

class Header extends React.Component {
  static listViewAction(data) {
    store.dispatch({
      type: LIST_VIEW_TYPE,
      data,
    });
  }

  constructor(props) {
    super(props);

    this.toggleSidebar = this.toggleSidebar.bind(this);
    this.listViewClick = this.listViewClick.bind(this);

    this.state = {
      showSidebar: false,
      listType: listViewType.LIST_VIEW_NORMAL,
    };
  }

  listViewClick(e) {
    e.preventDefault();
    const listType = (this.state.listType === listViewType.LIST_VIEW_NORMAL)
      ? listViewType.LIST_VIEW_SMALL : listViewType.LIST_VIEW_NORMAL;

    Header.listViewAction(listType);

    this.setState({
      listType,
    });
  }

  toggleSidebar() {
    this.setState({
      showSidebar: !this.state.showSidebar,
    });
  }

  render() {
    const { showSidebar, listType } = this.state;
    const listViewIconCls = (listType === listViewType.LIST_VIEW_NORMAL)
      ? ' header__tools__btn--view--big' : ' header__tools__btn--view--small';

    return (
      <div className='header'>
        <button className='sandwich__toggle button__noaction' onClick={ this.toggleSidebar } />
        <div className='header__location'>
          главная
        </div>
        <div className='header__tools'>
          <a href='/' className='header__tools__btn header__tools__btn--map' />
          <a href='/' className={ `header__tools__btn header__tools__btn--view${listViewIconCls}` } onClick={ this.listViewClick } />
        </div>

        {showSidebar && <Sidebar /> }
        <div className={ `body-fade fade${(showSidebar ? ' in' : '')}` } onClick={ this.toggleSidebar } />
      </div>
    );
  }
}

function mapToProps(state) {
  return {
    ...state,
  };
}

export default connect(mapToProps)(Header);

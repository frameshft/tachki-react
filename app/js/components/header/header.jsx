/* eslint-disable jsx-a11y/no-static-element-interactions,jsx-a11y/anchor-has-content */

import React from 'react';
import { connect } from 'react-redux';
import store from '../../store';
import Sidebar from './sidebar';
import LIST_VIEW_TYPE from '../../actions/listView';
import * as listViewType from '../../constants/listView';

import ListControls from './list.controls';
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
      showSidebar: this.props.isShownMobileSidebar,
      listType: listViewType.LIST_VIEW_NORMAL,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isShownMobileSidebar !== this.state.showSidebar) {
      this.toggleSidebar();
    }
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
    const { showSidebar } = this.state;
    this.setState({
      showSidebar: !showSidebar,
    });
  }

  render() {
    const { controls, post, user } = this.props;
    const { showSidebar } = this.state;
    const isAuthenticated = !!user.token;

    return (
      <div className='header'>
        <div className='mobile'>
          <button className='sandwich__toggle button__noaction' onClick={ this.toggleSidebar } />
          <div className='header__location'>
            { this.props.title }
          </div>
          <ListControls controls={ controls } post={ post } isAuthenticated={ isAuthenticated } />
        </div>
        { showSidebar && <Sidebar /> }
        <div className={ `body-fade fade${(showSidebar ? ' in' : '')}` } onClick={ this.toggleSidebar } />
      </div>
    );
  }
}

function mapToProps(state, props) {
  const post = state.entities.posts[props.params];
  const user = state.auth.user;
  const { isShownMobileSidebar } = state.views;

  return {
    post,
    user,
    isShownMobileSidebar,
  };
}

export default connect(mapToProps)(Header);

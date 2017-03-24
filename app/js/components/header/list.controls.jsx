/* eslint-disable jsx-a11y/no-static-element-interactions,jsx-a11y/anchor-has-content */

import React from 'react';

import HeaderControls from '../../constants/header.controls';
import FavouriteBtn from '../shared/favorite.toggle';
import ListViewBtn from '../shared/listView.toggle';

export default class extends React.Component {
  render() {
    const { controls, post, isAuthenticated } = this.props;

    let renderControls = [];

    switch (controls) {
      case HeaderControls.COMPANIES:
        renderControls.push(<button className='header__tools__btn header__tools__btn--map' />);
        renderControls.push(<ListViewBtn />);
        break;

      case HeaderControls.POSTS:
        renderControls.push(<button className='header__tools__btn header__tools__btn--sort' />);
        renderControls.push(<button className='header__tools__btn header__tools__btn--map' />);
        renderControls.push(<ListViewBtn />);
        break;

      case HeaderControls.POST_DETAIL:
        if (isAuthenticated) {
          if (!post.isMy) {
            renderControls.push(<FavouriteBtn post={ post } />);
          } else {
            renderControls.push(<button className='header__tools__btn header__tools__btn--edit' />);
          }
        }
        break;

      default:
        break;
    }

    renderControls = renderControls.map((x, i) => <li key={ i }>{ x }</li>);

    return (
      <ul className='header__tools'>
        { renderControls }
      </ul>
    );
  }
}

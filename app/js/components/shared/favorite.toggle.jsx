import React from 'react';
import { markPostAsFavorite, unMarkPostAsFavorite } from '../../actions/posts';
import store from '../../store';

class FavoriteToggle extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    const { post } = this.props;
    if (post.isFavorite) {
      store.dispatch(unMarkPostAsFavorite(post.id));
    } else {
      store.dispatch(markPostAsFavorite(post.id));
    }
  }

  render() {
    const { isDesktop, post } = this.props;
    let cls;

    if (post.isMy) {
      return null;
    }

    if (isDesktop) {
      // TODO: #[BOOKMARK] clean active state for bookmarked state
      cls = 'button__transparent btn--bookmark';
      if (post.isFavorite) {
        cls += ' btn--bookmark active';
      }
    } else {
      cls = 'header__tools__btn ';
      cls += post.isFavorite ? 'header__tools__btn--bookmarked' : 'header__tools__btn--bookmark';
    }
    return (
      <button onClick={ this.onClick } className={ cls } />
    );
  }
}

FavoriteToggle.PropTypes = {
  post: React.PropTypes.object.isRequired,
  isDesktop: React.PropTypes.bool,
};

FavoriteToggle.defaultProps = {
  isDesktop: false,
};


export default FavoriteToggle;

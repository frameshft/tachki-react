import React from 'react';
import { Link } from 'react-router';
import PromptDelete from './prompt.delete';

export default class Controls extends React.Component {
  constructor(props) {
    super(props);

    this.onDeleteClick = this.onDeleteClick.bind(this);
    this.onCancelClick = this.onCancelClick.bind(this);
    this.onShowLinks = this.onShowLinks.bind(this);

    this.state = {
      showPrompt: false,
      showLinks: false,
      isAuthenticated: !!props.user.token,
    };
  }

  onDeleteClick() {
    this.setState({
      showPrompt: true,
    });
  }

  onCancelClick() {
    this.setState({
      showPrompt: false,
    });
  }

  onShowLinks() {
    this.setState({
      showLinks: !this.state.showLinks,
    });
  }

  buildButtons(post) {
    /*
      Mod property decides when to display menu
     */
    const { isAuthenticated } = this.state;

    let mod = 0;
    if (post.isMy && isAuthenticated) {
      mod = 1;
    } else if (isAuthenticated) {
      mod = 2;
    }

    const buttons = [
      { mods: [1], key: 'up', text: 'Поднять объявление', link: `/up/${post.id}` },
      { mods: [1], key: 'edit-post', text: 'Редактировать объявление', link: '/' },
      { mods: [1], key: 'edit-pics', text: 'Редактировать изображения', link: '/' },
      { mods: [1], key: 'delete', text: 'Удалить' },
      { mods: [1, 2], key: 'comment', text: 'Написать комментарий', link: '/' },
      { mods: [2], key: 'price', text: 'Предложить цену', link: '/' },
      { mods: [0, 1, 2], key: 'share', text: 'Поделиться', link: '/' },
      { mods: [2], key: 'message', text: 'Написать сообщение', link: '/' },
      { mods: [2], key: 'report', text: 'Пожаловаться', link: '/' },
      { mods: [0, 2], key: 'call', text: 'Позвонить', link: '/' },
    ];

    return buttons.map((x) => {
      if (x.key === 'delete' && x.mods.includes(mod)) {
        return (
          <li key={ x.key } className='controls-links__item'><button
            onClick={ this.onDeleteClick }
            className={ `button__transparent controls-links__link controls-links__link--${x.key}` }
          >{ x.text }</button></li>
        );
      }
      if (x.mods.includes(mod)) {
        return (
          <li key={ x.key } className='controls-links__item'>
            <Link to={ x.link } className={ `controls-links__link controls-links__link--${x.key}` }>{ x.text }</Link>
          </li>
        );
      }
      return null;
    }).filter(x => x !== null);
  }

  render() {
    const { post } = this.props;
    const { showPrompt, showLinks } = this.state;
    const renderLink = this.buildButtons(post);

    const btnCls = !showLinks ? 'settings-button' : 'settings-button settings-button--toggled';

    return (
      <div>
        <button className={ btnCls } onClick={ this.onShowLinks }>+</button>
        { showLinks &&
          <div className='controls-links'>
            <button
              className='controls-links__mask button__transparent'
              onClick={ this.onShowLinks }
            >&nbsp;</button>
            <ul className='controls-links__list'>{ renderLink }</ul>
          </div>
        }
        { showPrompt &&
          <PromptDelete postId={ post.id } cancel={ this.onCancelClick } /> }
      </div>
    );
  }
}

Controls.propTypes = {
  post: React.PropTypes.object.isRequired,
  user: React.PropTypes.object.isRequired,
};

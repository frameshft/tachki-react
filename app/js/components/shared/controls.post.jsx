import React from 'react';
import { Link } from 'react-router';
import PromptDelete from './prompt.delete';

export default class Controls extends React.Component {
  constructor(props) {
    super(props);

    this.onDeleteClick = this.onDeleteClick.bind(this);
    this.onCancelClick = this.onCancelClick.bind(this);
    this.onShowLinks = this.onShowLinks.bind(this);
    this.showOfferPrice = this.showOfferPrice.bind(this);
    this.closeOfferPrice = this.closeOfferPrice.bind(this);

    this.state = {
      showPrompt: false,
      showLinks: false,
      isAuthenticated: !!props.user.token,
      offerprice: false,
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

  showOfferPrice() {
    this.setState({
      offerprice: true,
    });
  }

  closeOfferPrice() {
    this.setState({
      offerprice: false,
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
      { mods: [1, 2], key: 'comment', text: 'Написать комментарий', link: `/comments/${post.id}` },
      { mods: [2], key: 'price', text: 'Предложить цену', link: '/' },
      { mods: [0, 1, 2], key: 'share', text: 'Поделиться', link: '/' },
      { mods: [2], key: 'message', text: 'Написать сообщение', link: '/' },
      { mods: [2], key: 'report', text: 'Пожаловатcaься', link: '/' },
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
      } else if (x.key === 'price' && x.mods.includes(mod)) {
        return (
          <li key={ x.key } className='controls-links__item'><button
            onClick={ this.showOfferPrice }
            className={ `button__transparent controls-links__link controls-links__link--${x.key}` }
          >{ x.text }</button></li>
        );
      } else if (x.mods.includes(mod)) {
        return (
          <li key={ x.key } className='controls-links__item'>
            <Link to={ x.link } className={ `controls-links__link controls-links__link--${x.key}` }>{ x.text }</Link>
          </li>
        );
      }
      return null;
    }).filter(x => x !== null);
  }

  renderOfferPrice() {
    return (
      <div>
        <div className='modal fade in'>
          <div className='modal-dialog modal-dialog--offer-price'>
            <div className='modal-content'>
              <div className='modal-header'>
                <button
                  className='button__transparent modal-close'
                  onClick={ this.closeOfferPrice }
                  title='Закрыть окно'
                >
                  <i className='fa fa-times' />
                </button>
              </div>
              <div className='modal-body'>
                <form className='offer-price'>
                  <div className='offer-price__row'>
                    <div className='offer-price__label'>
                      Стоимость
                    </div>
                    <input
                      type='text'
                      className='offer-price__control offer-price__control--input'
                    />
                  </div>
                  <div className='offer-price__row'>
                    <div className='offer-price__label'>
                      Комментарий
                    </div>
                    <textarea
                      type='text'
                      className='offer-price__control offer-price__control--textarea'
                    />
                  </div>
                  <div className='offer-price__row offer-price__row--controls'>
                    <button
                      type='button'
                      className='offer-price__submit' onClick={ this.closeOfferPrice }
                    >
                      Отмена
                    </button>
                    <button type='submit' className='offer-price__submit'>
                      Оправить
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className='modal-backdrop fade in' />
      </div>
    );
  }

  render() {
    const { post } = this.props;
    const { showPrompt, showLinks, offerprice } = this.state;
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

        { offerprice && this.renderOfferPrice() }
      </div>
    );
  }
}

Controls.propTypes = {
  post: React.PropTypes.object.isRequired,
  user: React.PropTypes.object.isRequired,
};

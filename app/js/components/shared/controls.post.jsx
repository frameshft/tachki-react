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

  renderAuthed(car) {
    return (
      <ul className='controls-links__list'>
        <li className='controls-links__item'>
          <button onClick={ this.onDeleteClick } className='button__transparent'>Удалить</button>
        </li>
        <li className='controls-links__item'>
          <Link to={ `/up/${car.id}` }>Поднять объявления</Link>
        </li>
      </ul>
    );
  }

  renderAnonymous() {
    return (
      <ul className='controls-links__list'>
        <li className='controls-links__item'>
          <Link to='/' className='controls-links__link controls-links__link--comment'>
            Написать комментарий
          </Link>
        </li>
        <li className='controls-links__item'>
          <Link to='/' className='controls-links__link controls-links__link--price'>
            Предложить цену
          </Link>
        </li>
        <li className='controls-links__item'>
          <Link to='/' className='controls-links__link controls-links__link--share'>
            Поделиться
          </Link>
        </li>
        <li className='controls-links__item'>
          <Link to='/' className='controls-links__link controls-links__link--message'>
            Написать сообщение
          </Link>
        </li>
        <li className='controls-links__item'>
          <Link to='/' className='controls-links__link controls-links__link--report'>
            Пожаловаться
          </Link>
        </li>
        <li className='controls-links__item'>
          <Link to='/' className='controls-links__link controls-links__link--call'>
            Позвонить
          </Link>
        </li>
      </ul>
    );
  }

  render() {
    const { car, user } = this.props;
    const { showPrompt, showLinks } = this.state;
    const renderLink = user.token ? this.renderAuthed(car) : this.renderAnonymous();

    return (
      <div>
        <button className='settings-button' onClick={ this.onShowLinks }>+</button>
        { showLinks &&
          <div className='controls-links'>
            <div className='controls-links__mask' onClick={ this.onShowLinks } />
            { renderLink }
          </div>
        }
        { showPrompt &&
          <PromptDelete postId={ car.id } cancel={ this.onCancelClick } /> }
      </div>
    );
  }
}

Controls.propTypes = {
  car: React.PropTypes.object.isRequired,
  user: React.PropTypes.object.isRequired,
};

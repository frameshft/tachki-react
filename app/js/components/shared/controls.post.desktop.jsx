import React from 'react';
import { Link } from 'react-router';

export default class ControlsDesktop extends React.Component {
  constructor(props) {
    super(props);

    this.onCancelClick = this.onCancelClick.bind(this);
    this.onShowLinks = this.onShowLinks.bind(this);
    this.showOfferPrice = this.showOfferPrice.bind(this);
    this.closeOfferPrice = this.closeOfferPrice.bind(this);
    this.showReport = this.showReport.bind(this);
    this.closeReport = this.closeReport.bind(this);
    this.onReportTypeSelect = this.onReportTypeSelect.bind(this);

    this.state = {
      showPrompt: false,
      showLinks: false,
      isAuthenticated: !!props.user.token,
      offerprice: false,
      renderreport: false,
      otherReport: false,
    };
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

  onReportTypeSelect(e) {
    if (e.target.value === '5') {
      this.setState({
        otherReport: true,
      });
    } else {
      this.setState({
        otherReport: false,
      });
    }
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

  showReport() {
    this.setState({
      renderreport: true,
    });
  }

  closeReport() {
    this.setState({
      renderreport: false,
      otherReport: false,
    });
  }

  renderReport() {
    const { otherReport } = this.state;
    return (
      <div>
        <div className='modal fade in'>
          <div className='modal-dialog modal-dialog--offer-price'>
            <div className='modal-content'>
              <div className='modal-header'>
                Пожаловаться на объявление
                <button
                  className='button__transparent modal-close'
                  onClick={ this.closeReport }
                  title='Закрыть окно'
                >
                  <i className='fa fa-times' />
                </button>
              </div>
              <div className='modal-body'>
                <form className='offer-price'>
                  <div className='offer-price__row offer-price__row--controls'>
                    <div className='custom-select'>
                      <select
                        className='search-form__control search-form__control--select'
                        onChange={ this.onReportTypeSelect }
                      >
                        <option>Выберите жалобу</option>
                        <option>Неактульное объявление</option>
                        <option>Неуместное объявление</option>
                        <option>Несоответсвие фото</option>
                        <option>Мошенники</option>
                        <option value='5'>Другое</option>
                      </select>
                      <i className='fa fa-caret-down' />
                    </div>
                  </div>
                  {otherReport && <div>
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
                      <button type='submit' className='offer-price__submit'>
                        Оправить
                      </button>
                    </div>
                  </div>}
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className='modal-backdrop fade in' />
      </div>
    );
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
    const { offerprice, renderreport } = this.state;

    return (
      <div>
        <ul className='uni-button'>
          <li className='uni-button__item'>
            <Link to={ `/up/${post.id}` } className='uni-button__btn uni-button__btn--up'>
              Поднять объявление
            </Link>
          </li>
          <li className='uni-button__item'>
            <button
              onClick={ this.showOfferPrice }
              className='uni-button__btn uni-button__btn--offer-price'
            >
              Предложить цену
            </button>
          </li>
          <li className='uni-button__item'>
            <button href='#' className='uni-button__btn uni-button__btn--share'>
              Поделиться
            </button>
          </li>
          <li className='uni-button__item'>
            <button
              className='uni-button__btn uni-button__btn--report' onClick={ this.showReport }
            >
              Пожаловаться
            </button>
          </li>
        </ul>
        { offerprice && this.renderOfferPrice() }
        { renderreport && this.renderReport() }
      </div>
    );
  }
}

ControlsDesktop.propTypes = {
  post: React.PropTypes.object.isRequired,
  user: React.PropTypes.object.isRequired,
};

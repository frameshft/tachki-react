import React from 'react';
import { Link } from 'react-router';
import AbusePost from './abuse.post';

export default class ControlsDesktop extends React.Component {
  constructor(props) {
    super(props);

    this.onCancelClick = this.onCancelClick.bind(this);
    this.onShowLinks = this.onShowLinks.bind(this);
    this.showOfferPrice = this.showOfferPrice.bind(this);
    this.closeOfferPrice = this.closeOfferPrice.bind(this);
    this.showReport = this.showReport.bind(this);
    this.closeReport = this.closeReport.bind(this);

    this.state = {
      showPrompt: false,
      showLinks: false,
      isAuthenticated: !!props.user.token,
      offerprice: false,
      renderreport: false,
      isMy: props.post.isMy,
    };
  }

  componentWillReceiveProps(nextProps) {
    let stateChanged = false;
    const state = {};

    if (nextProps.user.token !== this.props.user.token) {
      state.isAuthenticated = !!nextProps.user.token;
      stateChanged = true;
    }

    if (nextProps.post.isMy !== this.props.post.isMy) {
      state.isMy = !!nextProps.user.token;
      stateChanged = true;
    }
    if (stateChanged) {
      this.setState({ ...state });
    }
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

  showReport() {
    this.setState({ renderreport: true });
  }

  closeReport() {
    this.setState({ renderreport: false });
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
    const { offerprice, renderreport, isAuthenticated, isMy } = this.state;

    return (
      <div>
        <ul className='uni-button'>
          {isMy && <li className='uni-button__item'>
            <Link to={ `/up/${post.id}` } className='uni-button__btn uni-button__btn--up'>
              Поднять объявление
            </Link>
          </li>}
          {isAuthenticated && !isMy && <li className='uni-button__item'>
            <button
              onClick={ this.showOfferPrice }
              className='uni-button__btn uni-button__btn--offer-price'
            >
              Предложить цену
            </button>
          </li>}
          {/* <li className='uni-button__item'>*/}
          { /* <button href='#' className='uni-button__btn uni-button__btn--share'>*/}
          {/* Поделиться*/}
          {/* </button>*/}
          {/* </li>*/}
          {!isMy && <li className='uni-button__item'>
            <button
              className='uni-button__btn uni-button__btn--report' onClick={ this.showReport }
            >
              Пожаловаться
            </button>
          </li>}
        </ul>
        { offerprice && this.renderOfferPrice() }
        { isAuthenticated && renderreport && <AbusePost post={ post } cb={ this.closeReport } /> }
      </div>
    );
  }
}

ControlsDesktop.propTypes = {
  post: React.PropTypes.object.isRequired,
  user: React.PropTypes.object.isRequired,
};

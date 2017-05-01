import React from 'react';
import store from '../../store';
import { abusePost } from '../../actions/posts';

export default class AbusePost extends React.Component {
  constructor(props) {
    super(props);

    this.closeReport = this.closeReport.bind(this);
    this.onReportTypeSelect = this.onReportTypeSelect.bind(this);
    this.onSendClick = this.onSendClick.bind(this);
    this.onAbuseTextChange = this.onAbuseTextChange.bind(this);

    this.state = {
      otherReport: false,
      abuseReason: '',
    };
  }

  onAbuseTextChange(e) {
    this.setState({
      abuseReason: e.target.value,
    });
  }

  onReportTypeSelect(e) {
    const reason = e.target.value;
    switch (reason) {
      case 'other':
        this.setState({
          otherReport: true,
          abuseReason: '',
        });
        break;
      case 'empty':
        break;
      default:
        this.setState({
          otherReport: false,
          abuseReason: '',
        });
        this.postAbuse(reason);
    }
  }

  onSendClick(e) {
    e.preventDefault();
    const { abuseReason } = this.state;
    if (abuseReason !== '') {
      this.postAbuse(abuseReason);
    }
  }

  closeReport() {
    const { cb } = this.props;
    this.setState({
      otherReport: false,
      abuseReason: '',
    });

    cb();
  }

  postAbuse(reason) {
    const { post, cb } = this.props;
    store.dispatch(abusePost(post.id, reason))
      .then(() => {
        this.setState({
          otherReport: false,
          abuseReason: '',
        });
        alert('Жалоба успено отправлена.');
        cb();
      });
  }

  render() {
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
                        <option value='empty'>Выберите жалобу</option>
                        <option value='Неактульное объявление'>Неактульное объявление</option>
                        <option value='Неуместное объявление'>Неуместное объявление</option>
                        <option value='Несоответсвие фото'>Несоответсвие фото</option>
                        <option value='Мошенники'>Мошенники</option>
                        <option value='other'>Другое</option>
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
                        onChange={ this.onAbuseTextChange }
                      />
                    </div>
                    <div className='offer-price__row offer-price__row--controls'>
                      <button type='submit' className='offer-price__submit offer-price__submit--report' onClick={ this.onSendClick }>
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
}

AbusePost.propTypes = {
  post: React.PropTypes.object.isRequired,
  cb: React.PropTypes.func.isRequired,
};

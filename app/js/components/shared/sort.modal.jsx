import React from 'react';
import { browserHistory } from 'react-router';

import '../../../style/sort-modal.scss';

export default class SortModal extends React.Component {
  constructor(props) {
    super(props);
    this.setSortCriteria = this.setSortCriteria.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      sort: '',
    };
  }

  onSubmit() {
    const { onClose } = this.props;
    const { sort } = this.state;
    let currentLocation = browserHistory.getCurrentLocation();
    const query = {
      ...currentLocation.query || {},
      sort,
    };

    currentLocation = browserHistory.createLocation(currentLocation.pathname, query);
    onClose();
    browserHistory.push({
      pathname: currentLocation.pathname,
      query,
    });
  }

  setSortCriteria(e) {
    this.setState({
      sort: e.target.value,
    });
  }

  render() {
    const { onClose } = this.props;
    const sort = browserHistory.getCurrentLocation().query.sort;
    return (
      <div>
        <div className='modal fade in modal--sort'>
          <div className='modal-backdrop fade in' onClick={ onClose } />
          <div className='modal-dialog'>
            <div className='modal-content'>
              <div className='modal-header'>
                <button
                  className='button__transparent modal-close'
                  onClick={ onClose }
                  title='Закрыть окно'
                >
                  <i className='fa fa-times' />
                </button>
              </div>
              <div className='sort-form'>
                <ul>
                  <li>
                    <input
                      type='radio' name='sort' defaultChecked={ sort === 'price' } value='price' id='sort-price' onChange={ this.setSortCriteria }
                    />
                    <label htmlFor='sort-price'>Сначала дешевые</label>
                  </li>
                  <li>
                    <input
                      type='radio' name='sort' defaultChecked={ sort === '-price' } value='-price' id='sort-price-2' onChange={ this.setSortCriteria }
                    />
                    <label htmlFor='sort-price-2'>Сначала дорогие</label>
                  </li>
                  <li>
                    <input
                      type='radio' name='sort' defaultChecked={ sort === 'created_at' } value='created_at' id='sort-date' onChange={ this.setSortCriteria }
                    />
                    <label htmlFor='sort-date'>Сначала старые</label>
                  </li>
                  <li>
                    <input
                      type='radio' name='sort' defaultChecked={ sort === '-created_at' } value='-created_at' id='sort-date-2' onChange={ this.setSortCriteria }
                    />
                    <label htmlFor='sort-date-2'>Сначала свежие</label>
                  </li>
                </ul>
                <div className=''>
                  <button onClick={ this.onSubmit } className='btn btn--primary'>
                    Отсортировать
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

SortModal.PropTypes = {
  image: React.PropTypes.number.isRequired,
  alt: React.PropTypes.string.isRequired,
  onClose: React.PropTypes.func.isRequired,
};

import React from 'react';
import { browserHistory } from 'react-router';

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
    return (
      <div>
        <div className='modal fade in'>
          <div className='modal-dialog modal-dialog--image'>
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
                      type='radio' name='sort' value='price' onChange={ this.setSortCriteria }
                    />
                    Сначала дешевые
                  </li>
                  <li>
                    <input
                      type='radio' name='sort' value='-price' onChange={ this.setSortCriteria }
                    />
                    Сначала дорогие
                  </li>
                  <li>
                    <input
                      type='radio' name='sort' value='created_at' onChange={ this.setSortCriteria }
                    />
                    Сначала старые
                  </li>
                  <li>
                    <input
                      type='radio' name='sort' value='-created_at' onChange={ this.setSortCriteria }
                    />
                    Сначала новые
                  </li>
                </ul>
                <div className=''>
                  <button onClick={ this.onSubmit } className='btn btn--primary'>
                    ОК
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='modal-backdrop fade in' />
      </div>
    );
  }
}

SortModal.PropTypes = {
  image: React.PropTypes.number.isRequired,
  alt: React.PropTypes.string.isRequired,
  onClose: React.PropTypes.func.isRequired,
};

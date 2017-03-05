import React from 'react';

export default class PromptDelete extends React.Component {
  render() {
    const { image, alt, onClose } = this.props;
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
              <div className='modal-body'>
                <img src={ image } alt={ alt } />
              </div>
            </div>
          </div>
        </div>
        <div className='modal-backdrop fade in' />
      </div>
    );
  }
}

PromptDelete.PropTypes = {
  image: React.PropTypes.number.isRequired,
  alt: React.PropTypes.string.isRequired,
  onClose: React.PropTypes.func.isRequired,
};

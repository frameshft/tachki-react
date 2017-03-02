import React from 'react';
import DeletePost from '../shared/delete.post';

export default class PromptDelete extends React.Component {
  render() {
    return (
      <div>
        <div className='modal fade in'>
          <div className='modal-dialog modal-dialog--prompt'>
            <div className='modal-content'>
              <div className='modal-header'>
                <div className='prompt__title'>
                  Вы действительно хотите удалить объявление?
                </div>
                <button
                  className='button__transparent modal-close'
                  onClick={ this.props.cancel }
                  title='Закрыть окно'
                >
                  <i className='fa fa-times' />
                </button>
              </div>
              <div className='modal-body text-right'>
                <div className='prompt__controls'>
                  <DeletePost postId={ this.props.postId } btnCls='btn btn--primary' />
                  <button onClick={ this.props.cancel } className='btn btn--cancel'>
                    cancel
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

PromptDelete.PropTypes = {
  postId: React.PropTypes.number.isRequired,
  cancel: React.PropTypes.func.isRequired,
};

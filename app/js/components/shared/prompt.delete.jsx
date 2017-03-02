import React from 'react';
import DeletePost from '../shared/delete.post';

export default class PromptDelete extends React.Component {
  render() {
    return (
      <div>
        <DeletePost postId={ this.props.postId } />
        <button onClick={ this.props.cancel }>cancel</button>
      </div>
    );
  }
}

PromptDelete.PropTypes = {
  postId: React.PropTypes.number.isRequired,
  cancel: React.PropTypes.func.isRequired,
};

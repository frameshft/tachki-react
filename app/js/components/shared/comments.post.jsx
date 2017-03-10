import React from 'react';
import { connect } from 'react-redux';
import { fetchComments, postComments } from '../../actions/posts';
import store from '../../store';

class CommentsPost extends React.Component {
  constructor(props) {
    super(props);

    this.onSendComment = this.onSendComment.bind(this);

    this.state = {
      comments: [],
    };
  }

  componentWillReceiveProps(nextProps) {
    const x = nextProps.post;
    const y = this.props.post;
    const { comments } = this.state;
    const isPostFound = x !== y && y === undefined;
    const predicate = y !== undefined && JSON.stringify(x.comments) !== JSON.stringify(y.comments);
    if (isPostFound) {
      store.dispatch(fetchComments(x.id));
    } else if (predicate) {
      this.setState({ comments: x.comments });
    } else if (y.comments.length !== comments.length) {
      this.setState({ comments: y.comments });
    }
  }

  onSendComment(e) {
    e.preventDefault(e);
    // TODO: save comment
    store.dispatch(postComments(this.props.params.id, 'kkkkkkkkkk'));
  }

  render() {
    const { post } = this.props;
    if (post === undefined) {
      return null;
    }
    const { comments } = this.state;
    const renderComments = comments.map(x => <li key={ x.id }>{ x.id }</li>);
    return (
      <div>
        <ul>{ renderComments }</ul>
        <div>
          <input type='text' placeholder='Введите комментарий' />
          <button onClick={ this.onSendComment }>Отправить</button>
        </div>
      </div>
    );
  }
}

CommentsPost.PropTypes = {
  post: React.PropTypes.object.isRequired,
};

function mapStateToProps(state, props) {
  const posts = state.entities.posts;
  const post = posts[props.params.id];
  return {
    post,
  };
}

export default connect(mapStateToProps)(CommentsPost);

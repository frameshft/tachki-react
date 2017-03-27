import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { fetchComments, postComments } from '../../actions/posts';
import store from '../../store';
import { importImage } from '../../utils';
import '../../../style/comment.scss';

class CommentsPost extends React.Component {
  constructor(props) {
    super(props);

    this.onSendComment = this.onSendComment.bind(this);
    this.onSendSubComment = this.onSendSubComment.bind(this);
    this.onHandleChange = this.onHandleChange.bind(this);
    this.onHandleSubCommentChange = this.onHandleSubCommentChange.bind(this);
    // this.commentClick = this.commentClick.bind(this);
    this.modalClose = this.modalClose.bind(this);

    this.state = {
      comments: [],
      commentInput: '',
      showModal: false,
      subCommentInput: '',
      commentId: null,
    };
  }

  componentDidMount() {
    const { post } = this.props;
    if (post) {
      store.dispatch(fetchComments(post.id));
    }
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
    store.dispatch(postComments(this.props.params.id, this.state.commentInput));

    this.setState({
      commentInput: '',
    });
  }

  onSendSubComment(e) {
    e.preventDefault(e);
    const { subCommentInput, commentId } = this.state;
    store.dispatch(postComments(this.props.params.id, subCommentInput, commentId));

    this.setState({
      subCommentInput: '',
    });

    this.modalClose();
  }

  onHandleChange(e) {
    this.setState({
      commentInput: e.target.value,
    });
  }

  onHandleSubCommentChange(e) {
    this.setState({
      subCommentInput: e.target.value,
    });
  }

  commentClick(idx) {
    this.setState({
      showModal: true,
      commentId: idx,
    });
  }

  modalClose() {
    this.setState({
      showModal: false,
      commentId: null,
    });
  }

  renderModal() {
    return (
      <div>
        <div className='modal fade in'>
          <div className='modal-dialog modal-dialog--comment'>
            <div className='modal-content'>
              <div className='modal-header'>
                <button
                  className='button__transparent modal-close'
                  title='Закрыть окно'
                  onClick={ this.modalClose }
                >
                  <i className='fa fa-times' />
                </button>
              </div>
              <div className='modal-body'>
                { this.renderCommentForm() }
              </div>
            </div>
          </div>
        </div>
        <div className='modal-backdrop fade in' />
      </div>
    );
  }

  renderSubComments(comment) {
    return (
      <div key={ comment.id } className='comment comment--child'>
        <div className='comment__media'>
          <img src={ importImage(comment.image) } alt='' className='comment__media__img' />
        </div>
        <div className='comment__body'>
          <div className='comment__author'>
            { comment.name }
          </div>
          <div className='comment__description'>
            { comment.description }
          </div>
        </div>
      </div>
    );
  }

  renderComment(comment) {
    const subComments = comment.subComments;
    const renderSubComments = subComments.map(x => this.renderSubComments(x));

    return (
      <button
        key={ comment.id }
        className='comment button__transparent'
        onClick={ this.commentClick.bind(this, comment.id) } //eslint-disable-line
      >
        <div className='comment__media'>
          <img src={ importImage(comment.image) } alt='' className='comment__media__img' />
        </div>
        <div className='comment__body'>
          <div className='comment__author'>
            { comment.name }
          </div>
          <div className='comment__description'>
            { comment.description }
          </div>
          <div className='comment__date'>
            { moment(comment.created).format('YY:MM:DD HH:mm') }
          </div>
          {renderSubComments}
        </div>
      </button>
    );
  }

  renderCommentForm() {
    const { subCommentInput } = this.state;
    const btnCls = (subCommentInput === '') ? 'disabled' : '';

    return (
      <div className='comment__form'>
        <input
          value={ subCommentInput }
          type='text'
          placeholder='Введите комментарий'
          className='comment__input' onChange={ this.onHandleSubCommentChange }
        />
        <button onClick={ this.onSendSubComment } className={ `comment__send ${btnCls}` } />
      </div>
    );
  }

  render() {
    const { post } = this.props;
    if (!post) {
      return null;
    }

    const { comments, commentInput, showModal } = this.state;
    const renderComments = comments.map(x => this.renderComment(x));
    const btnCls = (commentInput === '') ? 'disabled' : '';

    return (
      <div className='comment-wrapper'>
        <ul>{ renderComments }</ul>
        <div className='comment__form'>
          <input
            value={ commentInput }
            type='text'
            placeholder='Введите комментарий'
            className='comment__input' onChange={ this.onHandleChange }
          />
          <button onClick={ this.onSendComment } className={ `comment__send ${btnCls}` } />
        </div>
        { showModal && this.renderModal() }
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

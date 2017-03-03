import React from 'react';
import { makePostVIP } from '../../actions/posts';
import store from '../../store';

class VipPostBtn extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    store.dispatch(makePostVIP(this.state.props.post.id));
  }

  renderBtn() {
    return (
      <button onClick={ this.onClick }>make VIP</button>
    );
  }

  //
  renderMsg() {
    return (
      <div>Already VIP</div>
    );
  }

  render() {
    return this.props.post.is_vip ? this.renderMsg() : this.renderBtn();
  }
}

VipPostBtn.PropTypes = {
  post: React.PropTypes.object.isRequired,
};

export default VipPostBtn;

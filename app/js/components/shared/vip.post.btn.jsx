import React from 'react';
import { makePostVIP } from '../../actions/posts';
import store from '../../store';

class VipPostBtn extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    const balance = 0;
    if (balance < 100) {
      alert('Недостаточно средств');  // eslint-disable-line no-alert
    } else {
      store.dispatch(makePostVIP(this.props.post.id));
    }
  }

  renderBtn() {
    return (
      <button onClick={ this.onClick } className='btn btn--vip'>
        Сделать VIP
      </button>
    );
  }

  renderMsg() {
    return (
      <div className='vip__is-vip'>Это объявление уже VIP</div>
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

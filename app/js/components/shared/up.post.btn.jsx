import React from 'react';
import moment from 'moment';
import { votePostUp } from '../../actions/posts';
import store from '../../store';

class UpPostBtn extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    const { post } = this.props;
    store.dispatch(votePostUp(post.id))
      .then((res) => {
        moment.locale('ru');
        const time = moment.duration(res, 'seconds').humanize(true);
        const msg = res > 0 ? `Вы можете поднять объявление ${time}` : 'Вы успешно подняли объявление';
        alert(msg); // eslint-disable-line no-alert
      });
  }

  render() {
    return (
      <button onClick={ this.onClick } className='btn btn--up'>
        Поднять объявление
      </button>
    );
  }
}

UpPostBtn.PropTypes = {
  post: React.PropTypes.object.isRequired,
};


export default UpPostBtn;

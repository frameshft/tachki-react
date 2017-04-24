import React from 'react';
import { connect } from 'react-redux';
import store from '../../store';
import '../../../style/static.scss';
import { fetchFAQ } from '../../actions/list';

class FAQ extends React.Component {
  componentDidMount() {
    store.dispatch(fetchFAQ());
  }

  renderItem(item) {
    return (
      <li className='faq__item' key={ item.id }>
        <div className='faq__item__question'>
          { item.question }
        </div>
        <div className='faq__item__answer'>
          { item.answer }
        </div>
      </li>
    );
  }

  render() {
    const { faqs } = this.props;
    const item = faqs.map(x => this.renderItem(x));
    return (
      <div className='static-pages'>
        <ul>
          {item}
        </ul>
        FAQ
      </div>
    );
  }
}

function mapStateToProps(state) {
  const faqs = state.views.faq;

  return { faqs };
}

export default connect(mapStateToProps)(FAQ);

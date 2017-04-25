import React from 'react';
import { connect } from 'react-redux';
import store from '../../store';
import '../../../style/static.scss';
import { fetchFAQ } from '../../actions/list';
import FaqItem from './faq.item';

class FAQ extends React.Component {
  componentDidMount() {
    store.dispatch(fetchFAQ());
  }

  render() {
    const { faqs } = this.props;
    const item = faqs.map(x => <FaqItem faqItem={ x } key={ x.id } />);
    return (
      <div className='static-pages'>
        <h1 className='static-pages__title'>
          Часто задаваемые вопросы
        </h1>
        <ul>
          {item}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const faqs = state.views.faq;

  return { faqs };
}

export default connect(mapStateToProps)(FAQ);

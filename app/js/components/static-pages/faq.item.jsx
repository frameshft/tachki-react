import React from 'react';
import { connect } from 'react-redux';

class FaqItem extends React.Component {
  constructor(props) {
    super(props);

    this.expandAnswer = this.expandAnswer.bind(this);

    this.state = {
      answerExpanded: false,
    };
  }

  expandAnswer() {
    this.setState({
      answerExpanded: !this.state.answerExpanded,
    });
  }

  render() {
    const { faqItem } = this.props;

    const cls = this.state.answerExpanded ? ' faq__item--expanded' : '';
    const iconsCls = this.state.answerExpanded ? ' fa-angle-down' : ' fa-angle-right';

    return (
      <li className={ `faq__item${cls}` }>
        <button className='faq__item__question' onClick={ this.expandAnswer }>
          { faqItem.question }
          <i className={ `fa fa-angle-right${iconsCls}` } />
        </button>
        <div className='faq__item__answer' dangerouslySetInnerHTML={ { __html: faqItem.answer } } />
      </li>
    );
  }
}

FaqItem.propTypes = {
  faqItem: React.PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    ...state,
  };
}

export default connect(mapStateToProps)(FaqItem);

import React from 'react';
import { Link, browserHistory } from 'react-router';
import { updateQueryStringParameter } from '../../utils';

class Pagination extends React.Component {
  render() {
    const location = browserHistory.getCurrentLocation();

    const { onNext, onPrev, view, currentPage } = this.props;
    const prevLink = this.props.currentPage > 1;
    const nextLink = this.props.currentPage < this.props.totalPages;

    const nextBtn = !onNext ?
      (<Link to={ `/${view}${updateQueryStringParameter(location.search, 'page', currentPage + 1)}` } className='pagination__link'>
        <i className='fa fa-angle-right' />
      </Link>) :
      (<button className='pagination__link' onClick={ onNext }>
        <i className='fa fa-angle-right' />
      </button>)
    ;

    const prevBtn = !onPrev ?
      (<Link to={ `/${view}${updateQueryStringParameter(location.search, 'page', currentPage - 1)}` } className='pagination__link'>
        <i className='fa fa-angle-left' />
      </Link>) :
      (<button className='pagination__link' onClick={ onPrev }>
        <i className='fa fa-angle-left' />
      </button>)
    ;

    return (
      <ul className='pagination'>
        {prevLink && <li className='pagination__item pagination__item--prev'>
          { prevBtn }
        </li>}
        {nextLink && <li className='pagination__item pagination__item--next'>
          { nextBtn }
        </li>}
      </ul>
    );
  }
}

Pagination.PropTypes = {
  selectPage: React.PropTypes.number.isRequired,
  totalPage: React.PropTypes.number.isRequired,
  currentPage: React.PropTypes.number.isRequired,
  OnNext: React.PropTypes.func,
  OnPrev: React.PropTypes.func,
};

Pagination.defaultProps = {
  OnNext: null,
  OnPrev: null,
};

export default Pagination;

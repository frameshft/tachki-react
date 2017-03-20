import React from 'react';
import { Link } from 'react-router';

class Pagination extends React.Component {
  render() {
    const prevLink = this.props.currentPage > 1;
    const nextLink = this.props.currentPage < this.props.totalPages;

    return (
      <ul className='pagination'>
        {prevLink && <li className='pagination__item pagination__item--prev'>
          <Link to={ `/${this.props.view}?page=${this.props.currentPage - 1}` } className='pagination__link'>
            <i className='fa fa-angle-left' />
          </Link>
        </li>}
        {nextLink && <li className='pagination__item pagination__item--next'>
          <Link to={ `/${this.props.view}?page=${this.props.currentPage + 1}` } className='pagination__link'>
            <i className='fa fa-angle-right' />
          </Link>
        </li>}
      </ul>
    );
  }
}
Pagination.PropTypes = {
  selectPage: React.PropTypes.number.isRequired,
  totalPage: React.PropTypes.number.isRequired,
  currentPage: React.PropTypes.number.isRequired,
};

export default Pagination;

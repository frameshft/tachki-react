import React from 'react';
import { Link } from 'react-router';

class Pagination extends React.Component {
  render() {
    const prevLink = this.props.currentPage > 1;
    const nextLink = this.props.currentPage < this.props.totalPages;

    return (
      <ul className='pagination'>
        {prevLink && <li className='pagination__item'>
          <Link to={ `/${this.props.view}?page=${this.props.currentPage - 1}` } className='pagination__link'>
            Пред.
          </Link>
        </li>}
        {nextLink && <li className='pagination__item'>
          <Link to={ `/${this.props.view}?page=${this.props.currentPage + 1}` } className='pagination__link'>
            Следующая
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

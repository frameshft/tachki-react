import React from 'react';
import { Link } from 'react-router';

const TOTAL_PAGES = 3;

class Pagination extends React.Component {

  renderPageLink(pageNum, isCurrent) {
    const isActiveLinkClass = isCurrent ? ' pagination__link--active' : '';
    const liClass = `pagination__link${isActiveLinkClass}`;

    return (<li className='pagination__item' key={ pageNum }>
      <Link to={ `/${this.props.view}?page=${pageNum}` } className={ liClass }>{ pageNum }</Link>
    </li>);
  }

  render() {
    let startIndex = 1;
    let showTotalPages = this.props.totalPages;

    const pageLinks = [];
    const prevLink = this.props.currentPage > 1;
    const nextLink = this.props.currentPage < this.props.totalPages;

    if (this.props.totalPages > TOTAL_PAGES) {
      showTotalPages = TOTAL_PAGES;

      if (showTotalPages < this.props.currentPage) {
        startIndex = this.props.currentPage - (showTotalPages + 1);
        showTotalPages += (startIndex - 1);
      }
    }

    for (let pageNum = startIndex; pageNum <= showTotalPages; pageNum += 1) {
      pageLinks.push(this.renderPageLink(pageNum, this.props.currentPage === pageNum));
    }

    return (
      <ul className='pagination'>
        {prevLink && <li className='pagination__item'>
          <Link to={ `/${this.props.view}?page=${this.props.currentPage - 1}` } className='pagination__link'>
            Пред.
          </Link>
        </li>}
        { pageLinks }
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

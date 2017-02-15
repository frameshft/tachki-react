import React from 'react';

const TOTAL_PAGES = 3;

class Pagination extends React.Component {
  constructor(props) {
    super(props);

    this.onPageClick = this.onPageClick.bind(this);
    this.onNextClick = this.onNextClick.bind(this);
    this.onPrevClick = this.onPrevClick.bind(this);
  }

  onPageClick(page, e) {
    e.preventDefault();
    this.goToPage(page);
  }

  onNextClick(e) {
    e.preventDefault();
    this.goToPage(this.props.currentPage + 1);
  }

  onPrevClick(e) {
    e.preventDefault();
    this.goToPage(this.props.currentPage - 1);
  }

  goToPage(page) {
    if (page >= 1 && page <= this.props.totalPages) {
      this.props.selectPage(page);
      this.setState({
        currentPage: page,
      });
    }
  }


  renderPageLink(pageNum, isCurrent) {
    const boundClick = this.onPageClick.bind(this, pageNum);
    const isActiveLinkClass = isCurrent ? ' pagination__link--active' : '';
    const liClass = `pagination__link${isActiveLinkClass}`;

    return (<li className='pagination__item' key={ pageNum }>
      <button className={ liClass } onClick={ boundClick }>{ pageNum }</button>
    </li>);
  }

  render() {
    const { totalPages, currentPage } = this.props;
    let startIndex = 1;
    let showTotalPages = totalPages;

    const pageLinks = [];

    const prevLink = currentPage !== 1;
    const nextLink = currentPage !== totalPages;

    if (totalPages > TOTAL_PAGES) {
      showTotalPages = TOTAL_PAGES;

      if (showTotalPages < currentPage) {
        startIndex = currentPage - (showTotalPages + 1);
        showTotalPages += (startIndex - 1);
      }
    }

    for (let pageNum = startIndex; pageNum <= showTotalPages; pageNum += 1) {
      pageLinks.push(this.renderPageLink(pageNum, currentPage === pageNum));
    }

    return (
      <ul className='pagination'>
        {prevLink && <li className='pagination__item'>
          <button className='pagination__link' onClick={ this.onPrevClick }>
            Пред.
          </button>
        </li>}
        { pageLinks }
        {nextLink && <li className='pagination__item'>
          <button className='pagination__link' onClick={ this.onNextClick }>
            следующая
          </button>
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

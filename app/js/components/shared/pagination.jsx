import React from 'react';

const TOTAL_PAGES = 3;

export default class Pagination extends React.Component {
    renderPageLink(pageNum, isCurrent) {
        const boundClick = this.onPageClick.bind(this, pageNum);

        const liClass = 'pagination__link' + (isCurrent ? ' pagination__link--active' : '');

        return  (<li className="pagination__item" key={pageNum}>
            <a href="#" className={liClass} onClick={boundClick}>{pageNum}</a>
        </li>);
    }

    constructor() {
        super();

        this.onPageClick = this.onPageClick.bind(this);
        this.paginationNavClick = this.paginationNavClick.bind(this);
    }

    onPageClick(page, e) {
        e.preventDefault();
        this.props.selectPage(page);
    }

    paginationNavClick(page, e) {
        e.preventDefault();

        this.props.selectPage(page);

        this.setState({
            currentPage: page
        });
    }

    render() {
        const {totalPages, currentPage} = this.props;
        let prevPageClick, nextPageClick = undefined;
        let startIndex = 1;
        let showTotalPages = totalPages;

        const pageLinks = [];

        const prevLink = currentPage != 1;
        const nextLink = currentPage != totalPages;

        if (totalPages > TOTAL_PAGES) {
            showTotalPages = TOTAL_PAGES;
            if (currentPage !== 0) {
                prevPageClick = this.paginationNavClick.bind(this, currentPage - 1);
            }

            if (currentPage !== totalPages) {
                nextPageClick = this.paginationNavClick.bind(this, currentPage + 1);
            }

            if (showTotalPages < currentPage) {
                startIndex = currentPage - showTotalPages + 1;
                showTotalPages += startIndex - 1;
            }
        }

        for (let pageNum = startIndex; pageNum <= showTotalPages; pageNum++) {
            pageLinks.push(this.renderPageLink(pageNum, currentPage === pageNum));
        }

        return (
            <ul className="pagination">
                {prevLink && <li className="pagination__item">
                    <a href="#" className="pagination__link" onClick={prevPageClick}>
                        Пред.
                    </a>
                </li>}
                {pageLinks}
                {nextLink && <li className="pagination__item" onClick={nextPageClick}>
                    <a href="#" className="pagination__link">
                        следующая
                    </a>
                </li>}
            </ul>
        )
    }
}
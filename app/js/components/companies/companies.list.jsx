import React from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import store from '../../store';
import * as listViewType from '../../constants/listView';
import { fetchPaginatedResponse, SUCCESS_FETCH_COMPANIES_LIST } from '../../actions/list';

import Company from './company';
import Pagination from '../shared/pagination';
import { STORE_A_COMPANY, fetchCompaniesCount } from '../../actions/companies';

class CompanyList extends React.Component {
  constructor(props) {
    super(props);
    this.alertClose = this.alertClose.bind(this);
    this.onSearchClick = this.onSearchClick.bind(this);

    this.state = {
      showAlert: true,
    };
  }

  componentDidMount() {
    this.getPosts();
    const { url } = this.props;
    store.dispatch(fetchCompaniesCount(url.search));
  }

  componentDidUpdate(prevProps) {
    if (prevProps.currentPage !== this.props.currentPage) {
      this.getPosts();
    }
  }

  onSearchClick() {
    // TODO: make modal
    browserHistory.push('/companies/search');
  }

  getPosts() {
    const { url } = this.props;
    store.dispatch(fetchPaginatedResponse({
      entities: STORE_A_COMPANY,
      component: SUCCESS_FETCH_COMPANIES_LIST,
    }, `/companies/${url.search}`, this.props.currentPage));
  }

  getPageItemsCount(page, actualItemsLength, totalItemsCount, totalPages, maxPageSize = 12) {
    const pageItemsLength = actualItemsLength >= maxPageSize ? actualItemsLength : maxPageSize;
    const currentItems = (page * maxPageSize) - (maxPageSize - 1);
    let totalItemsOnPage = page * pageItemsLength;
    if (totalItemsCount < totalItemsOnPage) {
      totalItemsOnPage = totalItemsCount;
    }
    const itemsCount = totalPages === 1 ? actualItemsLength : `${currentItems}-${totalItemsOnPage}`;

    return {
      itemsCount,
      totalItemsCount,
    };
  }

  alertClose() {
    this.setState({
      showAlert: false,
    });
  }

  renderFrontpage() {
    const { isFrontPage } = this.props;

    return isFrontPage ?
      <Link to='/companies' className='frontpage__block__all-links'>
        Все компании
        <i className='fa fa-arrow-right' />
      </Link> :
      <ul className='head-tools'>
        <li className='head-tools__item head-tools__item--search'>
          <button className='button__transparent' onClick={ this.onSearchClick }>
            Поиск
          </button>
        </li>
        <li className='head-tools__item head-tools__item--marker'>
          <button className='button__transparent'>
            Показать на карте
          </button>
        </li>
      </ul>;
  }

  render() {
    const { showAlert } = this.state;
    const { companies, listView, currentPage, entities } = this.props;

    const listsCls = (listView === listViewType.LIST_VIEW_NORMAL) ? '' : ' list--small';
    const companiesRender = [];

    if (companies.list.length > 0) {
      companies.list.forEach((i) => {
        const item = entities[i];
        companiesRender.push(
          <Company key={ item.id } company={ item } />,
        );
      });
    }

    const paginationProps = {
      totalPages: companies.totalPages,
      view: 'companies',
      currentPage,
    };

    const { itemsCount, totalItemsCount } = this.getPageItemsCount(
      currentPage,
      companiesRender.length,
      companies.total,
      companies.totalPages,
      12,
    );

    return (
      <div className='body companies'>
        <div className='frontpage__block__head desktop'>
          <h3 className='frontpage__block__title'>
            Компании
          </h3>
          { this.renderFrontpage() }
        </div>
        {showAlert && <div className='alert alert--red mobile'>
          Хотите стать компанией?
          <button className='alert__close button__transparent' onClick={ this.alertClose }>
            <i className='fa fa-times' />
          </button>
        </div>}
        <div className={ `list${listsCls}` }>
          { companiesRender }
        </div>
        <div className='body-bottom'>
          <h3 className='total-item-num'>
            Показано компаний { itemsCount } из { totalItemsCount }
          </h3>
          <Pagination { ...paginationProps } />
        </div>
      </div>
    );
  }
}

CompanyList.propTypes = {
  listView: React.PropTypes.number.isRequired,
  companies: React.PropTypes.object.isRequired,
  entities: React.PropTypes.object.isRequired,
  currentPage: React.PropTypes.number.isRequired,
  isFrontPage: React.PropTypes.bool,
};

CompanyList.defaultProps = {
  isFrontPage: false,
};

function mapToProps(state) {
  let currentPage = state.routing.locationBeforeTransitions.query.page;
  currentPage = currentPage !== undefined ? +currentPage : 1;

  return {
    entities: state.entities.users,
    companies: state.views.companies,
    listView: state.views.listView,
    url: state.routing.locationBeforeTransitions,
    currentPage,
  };
}

export default connect(mapToProps)(CompanyList);

import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
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

    this.state = {
      showAlert: true,
    };
  }

  componentDidMount() {
    store.dispatch(fetchPaginatedResponse({
      entities: STORE_A_COMPANY,
      component: SUCCESS_FETCH_COMPANIES_LIST,
    }, '/companies', this.props.currentPage));

    store.dispatch(fetchCompaniesCount());
  }

  componentDidUpdate(prevProps) {
    if (prevProps.currentPage !== this.props.currentPage) {
      store.dispatch(fetchPaginatedResponse({
        entities: STORE_A_COMPANY,
        component: SUCCESS_FETCH_COMPANIES_LIST,
      }, '/companies', this.props.currentPage));
    }
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
          <button className='button__transparent'>
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
        <h2>Total companies: { companies.total }</h2>
        <Pagination { ...paginationProps } />
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
    currentPage,
  };
}

export default connect(mapToProps)(CompanyList);

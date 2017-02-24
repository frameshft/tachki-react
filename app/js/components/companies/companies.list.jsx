import React from 'react';
import { connect } from 'react-redux';
import store from '../../store';
import * as listViewType from '../../constants/listView';
import { fetchPaginatedResponse, SUCCESS_FETCH_COMPANIES_LIST } from '../../actions/list';

import Company from './company';
import Pagination from '../shared/pagination';
import { STORE_A_COMPANY } from '../../actions/companies';

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
        {showAlert && <div className='alert alert--red'>
          Хотите стать компанией?
          <button className='alert__close button__transparent' onClick={ this.alertClose }>
            <i className='fa fa-times' />
          </button>
        </div>}
        <div className={ `list${listsCls}` }>
          { companiesRender }
        </div>
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

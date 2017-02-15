import React from 'react';
import { connect } from 'react-redux';
import store from '../../store';
import { FETCH_COMPANIES_LIST } from '../../actions/companies';
import API from '../../api';
import * as listViewType from '../../constants/listView';

import Company from './company';
import Pagination from '../shared/pagination';

class CompanyList extends React.Component {

  static fetchCompanies(page = 1) {
    API.fetch(`/companies/?page=${page}`)
      .then((res) => {
        store.dispatch({
          type: FETCH_COMPANIES_LIST,
          data: res,
        });
      });
  }

  constructor(props) {
    super(props);

    this.alertClose = this.alertClose.bind(this);
    this.onPageClick = this.onPageClick.bind(this);

    this.state = {
      showAlert: true,
      currentPage: 1,
    };
  }

  componentDidMount() {
    CompanyList.fetchCompanies();
  }

  onPageClick(page) {
    CompanyList.fetchCompanies(page);

    this.setState({
      currentPage: page,
    });
  }

  alertClose() {
    this.setState({
      showAlert: false,
    });
  }

  render() {
    const { showAlert, currentPage } = this.state;
    const { companies, listView } = this.props;

    const listsCls = (listView === listViewType.LIST_VIEW_NORMAL) ? '' : ' list--small';
    const companiesRender = [];

    if (companies.status === 1) {
      companies.ordering.forEach((i) => {
        const item = companies.list[i];
        companiesRender.push(<Company key={ item.id } company={ item } />);
      });
    }

    const paginationProps = {
      totalPages: companies.totalPages,
      selectPage: this.onPageClick,
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
};

function mapToProps(state) {
  const listView = state.listView.get('listView');
  return {
    companies: state.companies,
    listView,
  };
}

export default connect(mapToProps)(CompanyList);

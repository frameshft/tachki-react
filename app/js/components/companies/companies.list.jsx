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
        const data = {
          ...res,
          currentPage: page,
        };
        store.dispatch({
          type: FETCH_COMPANIES_LIST,
          data,
        });
      });
  }

  constructor(props) {
    super(props);
    this.alertClose = this.alertClose.bind(this);

    this.state = {
      showAlert: true,
    };
  }

  componentDidMount() {
    CompanyList.fetchCompanies(this.props.currentPage);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.currentPage !== this.props.currentPage) {
      CompanyList.fetchCompanies(this.props.currentPage);
    }
  }

  alertClose() {
    this.setState({
      showAlert: false,
    });
  }

  render() {
    const { showAlert } = this.state;
    const { companies, listView, currentPage } = this.props;

    const listsCls = (listView === listViewType.LIST_VIEW_NORMAL) ? '' : ' list--small';
    const companiesRender = [];

    if (companies.ordering[this.props.currentPage] !== undefined) {
      companies.ordering[this.props.currentPage].forEach((i) => {
        const item = companies.list[i];
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
  currentPage: React.PropTypes.number.isRequired,
};

function mapToProps(state) {
  const listView = state.listView.listView;
  let currentPage = state.routing.locationBeforeTransitions.query.page;
  currentPage = currentPage !== undefined ? +currentPage : 1;

  return {
    companies: state.companies,
    listView,
    currentPage,
  };
}

export default connect(mapToProps)(CompanyList);

import React from 'react';
import {connect} from 'react-redux';
import store from  '../../store';
import {FETCH_COMPANIES_LIST} from "../../actions/companies";
import API from '../../api';
import * as listViewType from '../../constants/listView';

import Company from './company';
import Pagination from '../shared/pagination';

class CompanyList extends React.Component {

  fetchCompanies() {
    API.fetch('/companies/')
      .then(res => {
        store.dispatch({
          type: FETCH_COMPANIES_LIST,
          data: res,
        });
      });
  }

    fetchPage(page) {
        API.fetch(`/companies/?page=${page}`)
            .then(res => {
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
      currentPage: 1
    };
  }

  componentDidMount() {
    this.fetchCompanies();
  }

  onPageClick(page) {
    this.fetchPage(page);

    this.setState({
      currentPage: page
    });
  }

  alertClose() {
    this.setState({
      showAlert: false
    })
  }

  render() {
    const {showAlert, currentPage} = this.state;
    const {companies, listView} = this.props;

    const listsCls = (listView === listViewType.LIST_VIEW_NORMAL) ? "" : " list--small";

    const companiesList = companies.get('list');
    const companiesRender = [];

    if (companies.get('status') === 1) {
      companiesList.map(function (item) {
        companiesRender.push(<Company key={item.id} company={item}/>)
      });
    }

    const paginationProps = {
        totalPages: companies.get('totalPages'),
        selectPage: this.onPageClick,
        currentPage
    };

    return (
      <div className="body companies">
        {showAlert && <div className="alert alert--red">
          Хотите стать компанией?
          <i className="fa fa-times alert__close" onClick={this.alertClose}/>
        </div>}
        <div className={"list" + listsCls}>
          { companiesRender }
        </div>
        <Pagination {...paginationProps} />
      </div>
    )
  }
}

function mapToProps(state) {
  const listView = state.listView.get('listView');
  return {
    companies: state.companies,
    listView,
  };
}

export default connect(mapToProps)(CompanyList);
import React from 'react';
import {connect} from 'react-redux';
import store from  '../../store';
import {FETCH_COMPANIES_LIST} from "../../actions/companies";
import API from '../../api';

class CompanyList extends React.Component {

  fetchCompanies() {
    API.fetch('companies/')
      .then(res => {
        store.dispatch({
          type: FETCH_COMPANIES_LIST,
          data: res,
        });
      });
  }

  componentDidMount() {
    this.fetchCompanies();
  }

  render() {
    const companies = this.props.companies.toJS();
    let companyList;
    if (companies.status === 1) {
      companyList = companies.list.map(item => <li key={item.id}><img src={item.image}/>{item.name}</li>);
    } else {
      companyList = []
    }

    return (
      <div>
        <ul>
          { companyList}
        </ul>
      </div>
    )
  }
}

function mapToProps(state) {
  return {
    companies: state.companies
  };
}

export default connect(mapToProps)(CompanyList);
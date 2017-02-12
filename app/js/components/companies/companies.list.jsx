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
    let companyList = [];
    if (companies.status === 1) {

      for (let x in companies.list) {
        if (companies.list.hasOwnProperty(x)) {
          let company = companies.list[x]
          companyList.push(<li key={x}><img src={company.image}/>{company.name}</li>)
        }
      }
    }
    companyList.sort((a, b) => b.key- a.key);

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
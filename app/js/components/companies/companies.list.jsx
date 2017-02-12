import React from 'react';
import {connect} from 'react-redux';
import store from  '../../store';
import {FETCH_COMPANIES_LIST} from "../../actions/companies";
import API from '../../api';

import Company from './company';

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

  constructor(props) {
    super(props);

    this.alertClose = this.alertClose.bind(this);

    this.state = {
      showAlert: true
    };
  }

  componentDidMount() {
    this.fetchCompanies();
  }

  alertClose() {
    this.setState({
      showAlert: false
    })
  }

  render() {
    const {showAlert} = this.state;

    const companies = this.props.companies.toJS();
    let companyList = [];
    if (companies.status === 1) {

      for (let x in companies.list) {
        if (companies.list.hasOwnProperty(x)) {
          let company = companies.list[x]
          companyList.push(<Company key={x} company={company}/>)
        }
      }
    }
    companyList.sort((a, b) => b.key- a.key);

    return (
      <div className="body companies">
        {showAlert && <div className="alert alert--red">
          Хотите стать компанией?
          <i className="fa fa-times alert__close" onClick={this.alertClose}/>
        </div>}
        <div className="list list--small">
          { companyList}
        </div>
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
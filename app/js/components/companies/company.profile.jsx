import React from 'react';
import { connect } from 'react-redux';
import API from '../../api';
import store from '../../store';
import { FETCH_COMPANY_INFO } from '../../actions/companyProfile';

class CompanyProfile extends React.Component {
  static fetchCompanies() {
    API.fetch(window.location.pathname)
      .then((res) => {
        store.dispatch({
          type: FETCH_COMPANY_INFO,
          data: res,
        });
      });
  }

  componentDidMount() {
    // CompanyProfile.fetchCompanies();
  }

  render() {
    return (
      <div>CompanyProfile</div>
    );
  }
}

CompanyProfile.propTypes = {
  info: React.PropTypes.object.isRequired,
};

function mapToProps(state) {
  return {
    info: state.companyProfile,
  };
}

export default connect(mapToProps)(CompanyProfile);


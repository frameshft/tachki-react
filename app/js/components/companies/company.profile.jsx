import React from 'react';
import store from '../../store';
import { FETCH_COMPANY_INFO } from '../../actions/companyProfile';
import API from '../../api';
import { connect } from 'react-redux';

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
    CompanyProfile.fetchCompanies();
  }

  render() {
    // console.log(this.props.routeParams);

    return (
      <div>CompanyProfile</div>
    )
  }
}

CompanyProfile.propTypes = {
  info: React.PropTypes.object.isRequired
};

function mapToProps(state) {
  return {
    info: state.companyProfile,
  };
}

export default connect(mapToProps)(CompanyProfile);
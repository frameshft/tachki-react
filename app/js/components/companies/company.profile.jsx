import React from 'react';
import { connect } from 'react-redux';
import API from '../../api';
import store from '../../store';

import CompanyServices from './company.services';
import { GET_A_COMPANY } from '../../actions/companies';

class CompanyProfile extends React.Component {
  static fetchCompanies() {
    API.fetch(window.location.pathname)
      .then((res) => {
        store.dispatch({
          type: GET_A_COMPANY,
          data: res,
        });
      });
  }

  componentDidMount() {
    CompanyProfile.fetchCompanies();
  }

  render() {
    const { companies } = this.props;
    const company = companies[this.props.params.id];
    const services = [];

    if (company !== undefined && company.services !== undefined) {
      const keys = Object.keys(company.services);

      keys.forEach((x, i) => {
        services.push(
          <CompanyServices key={ i } name={ x } services={ company.services[x] } />,
        );
      });
    }

    return (
      <div>
        {company && <div>
          <div>
            { company.name }
          </div>
          <div>
            <img src={ company.image } alt={ company.name } />
          </div>
          <div>
            { company.profile_info }
          </div>
          <div>
            { company.phone }
          </div>
          <div>
            { company.address }
          </div>
          <div>
            { services }
          </div>
        </div>}
      </div>
    );
  }
}

CompanyProfile.propTypes = {
  companies: React.PropTypes.object.isRequired,
};

function mapToProps(state) {
  const companies = state.entities.users;

  return {
    companies,
  };
}

export default connect(mapToProps)(CompanyProfile);
import React from 'react';
import { connect } from 'react-redux';
import { breadcrumbify } from 'redux-breadcrumb-trail';

function CompanyBreadcrumb({ company }) {
  if (!company.name) return <i>Загружается...</i>;
  return <i>{company.name}</i>;
}

function MapStateToProps(state, props) {
  const companies = state.entities.users;
  const company = companies[props.params.id] || {};
  return { company };
}

export default connect(MapStateToProps)(breadcrumbify(CompanyBreadcrumb));

import React from 'react';
import { connect } from 'react-redux';
import { breadcrumbify } from 'redux-breadcrumb-trail';

function SearchBreadcrumb({ htmlTitle }) {
  if (!htmlTitle) return <i>Загружается...</i>;
  return <i>{htmlTitle}</i>;
}

function MapStateToProps(state) {
  return { htmlTitle: state.views.meta.title };
}

export default connect(MapStateToProps)(breadcrumbify(SearchBreadcrumb));

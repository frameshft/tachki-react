import React from 'react';
import { Link } from 'react-router';
import { Breadcrumb } from 'semantic-ui-react';
import { connect } from 'react-redux';

const getPaths = (p, i, arr, breadcrumbs) => {
  if (i === 0) {
    return {
      key: i,
      content: (<Link to={ '/' }>Главная</Link>),
      active: (i === arr.length - 1),
      link: (i < arr.length - 1),
    };
  }
  if (i === arr.length - 1) {
    return {
      key: i,
      content: breadcrumbs[p],
      active: (i === arr.length - 1),
    };
  }
  return {
    key: i,
    content: (<Link to={ `${arr.slice(0, i + 1).join('/')}` }>{ breadcrumbs[p] }</Link>),
    active: (i === arr.length - 1),
    link: (i < arr.length - 1),
  };
};

const BreadcrumbsContainer = ({ pathname, breadcrumbs }) => {
  const paths = pathname.split('/').map((p, i, arr) => getPaths(p, i, arr, breadcrumbs));
  return <Breadcrumb sections={ paths } divider='>' />;
};

function MapStateToProps(state, props) {
  const breadcrumbs = state.views.meta.breadcrumbs || {};
  const pathname = props.pathname || {};
  return { breadcrumbs, pathname };
}

export default connect(MapStateToProps)(BreadcrumbsContainer);

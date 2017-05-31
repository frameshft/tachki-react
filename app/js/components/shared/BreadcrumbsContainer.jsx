import React from 'react';
import { Link } from 'react-router';
import { Breadcrumb } from 'semantic-ui-react';

const getPaths = (p, i, arr) => {
  if (i === 0) {
    return {
      key: i,
      content: (<Link to={ '/' }>Home</Link>),
      active: (i === arr.length - 1),
      link: (i < arr.length - 1),
    };
  }
  if (i === arr.length - 1) {
    return {
      key: i,
      content: p,
      active: (i === arr.length - 1),
    };
  }

  return {
    key: i,
    content: (<Link to={ `${arr.slice(0, i + 1).join('/')}` }>{p}</Link>),
    active: (i === arr.length - 1),
    link: (i < arr.length - 1),
  };
};

const BreadcrumbsContainer = (props) => {
  const paths = props.pathname.split('/').map(getPaths);
  return <Breadcrumb sections={ paths } divider='/' />;
};

export default BreadcrumbsContainer;

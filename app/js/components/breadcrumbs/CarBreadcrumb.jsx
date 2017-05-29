import React from 'react';
import { connect } from 'react-redux';
import { breadcrumbify } from 'redux-breadcrumb-trail';

function CarBreadcrumb({ car }) {
  if (!car.title) return <i>Загружается...</i>;
  return <i>{car.title}</i>;
}

function MapStateToProps(state, props) {
  const cars = state.entities.posts;
  const car = cars[props.params.id] || {};
  return { car };
}

export default connect(MapStateToProps)(breadcrumbify(CarBreadcrumb));

import React from 'react';
import { connect } from 'react-redux';
import { breadcrumbify } from 'redux-breadcrumb-trail';

function ServiceBreadcrumb({ post }) {
  if (!post.title) return <i>Загружается...</i>;
  return <i>{post.title}</i>;
}

function MapStateToProps(state, props) {
  const posts = state.entities.posts;
  const post = posts[props.params.id] || {};
  return { post };
}

export default connect(MapStateToProps)(breadcrumbify(ServiceBreadcrumb));

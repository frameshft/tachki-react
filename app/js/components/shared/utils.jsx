import React from 'react';
import PostItem from './post.item';

function getEndponit(category) {
  switch (category) {
    case 'automobile':
      return '/automobiles';
    case 'spare':
      return '/spare-parts';
    case 'service':
      return '/services';
    case 'cargo':
    default:
      return '/cargo';
  }
}

export function getPostComponent(item) {
  return <PostItem key={ item.id } post={ item } endpoint={ getEndponit(item.postType) } />;
}

export default true;

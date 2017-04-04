import React from 'react';
import PostItem from './post.item';

export function getPostComponent(item) {
  return <PostItem key={ item.id } post={ item } />;
}

export default true;

import React from 'react';
import Car from '../cars/car';
import SparePart from '../spare-parts/part';

export function getPostComponent(item) {
  switch (item.post_type) {
    // TODO: add services and cargo
    case 'sparepart':
      return (<SparePart key={ item.id } part={ item } />);
    case 'automobile':
      return (<Car key={ item.id } car={ item } />);
    default:
      return null;
  }
}

export default true;

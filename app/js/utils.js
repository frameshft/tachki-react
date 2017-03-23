/* eslint-disable global-require */

export function listToMap(list, key = 'id') {
  let objects = {};

  list.forEach((item) => {
    objects = {
      ...objects,
      [item[key]]: Object.assign({}, item),
    };
  });

  return objects;
}


export function importImage(path, defaultImg = 'no-image') {
  if (path) {
    return path;
  }

  switch (defaultImg) {
    case 'no-image':
      return require('../img/no-photo.jpg');
    default:
      return null;
  }
}

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


export function importImage(path, img, defaultImg = 'no-image') {
  let width = '';
  let height = '';
  if (img !== undefined) {
    width = img.offsetWidth;
    height = img.offsetHeight;
  }

  if (path) {
    return `${path}?w=${width}&h=${height}`;
  }

  switch (defaultImg) {
    case 'no-image':
      return require('../img/no-photo.jpg');
    default:
      return null;
  }
}

export function updateQueryStringParameter(uri, key, value) {
  const re = new RegExp(`([?&])${key}=.*?(&|$)`, 'i');
  const separator = uri.indexOf('?') !== -1 ? '&' : '?';

  if (uri.match(re)) {
    return uri.replace(re, `$1${key}=${value}$2`);
  }

  return `${uri}${separator}${key}=${value}`;
}

export function mapToArray(map) {
  return Object.entries(map).map(([k, v]) => v); // eslint-disable-line
}

/* eslint-disable global-require */

import API from './api';

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
  const queryParams = img ? `?w=${img.offsetWidth}&h=${img.offsetHeight}` : '';

  if (path) {
    return `${path}${queryParams}`;
  }

  switch (defaultImg) {
    case 'no-image':
      return API.getStaticUrl(`no-photo.jpg${queryParams}`);
    case 'no-user':
      return API.getStaticUrl('no-photo-user.jpg');
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

export function getCookie(cname) {
  const name = `${cname}=`;
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');

  for (let i = 0; i < ca.length; i++) { // eslint-disable-line
    let c = ca[i];

    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
}

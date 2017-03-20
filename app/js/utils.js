/* eslint-disable global-require */

export default function importImage(path, defaultImg = 'no-image') {
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

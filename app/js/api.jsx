import store from './store';
import { SUCESS_FETCH_SIGNOUT } from './actions/auth/index';

const axios = require('axios');

// const baseUrl = 'http://92.245.109.160:1248/';
const isProduction = process.env.NODE_ENV === 'production';
const baseUrl = isProduction ? 'http://tachki.kg/' : 'http://92.245.109.160:1248/';
const baseAPI = 'react';
const locale = 'ru';
const apiToken = isProduction ? 'tachki.kg:U-M_6a6B_JA6zbWXfxvQEXXAWzM' : 'tachki.kg:Je-w5kSyuxz6oXm5ootzHAlbas8';

const baseAbsoluteUrl = `${baseUrl}${locale}/${baseAPI}`;

const apiRequest = axios.create({
  baseURL: baseAbsoluteUrl,
  headers: {
    'Accept-Language': locale,
    'X-API-TOKEN': apiToken,
  },
  responseType: 'json',
  withCredentials: false,
  validateStatus: status => status >= 200 && status < 500,
});

apiRequest.interceptors.response.use((response) => {
  const data = response.data;
  if (response.status === 204) {
    return response;
  }
  if (response.status === 401) {
    store.dispatch({ type: SUCESS_FETCH_SIGNOUT });
    return Promise.reject({ status: 401, error: 'Unauthorized' });
  } else if (response.status >= 400) {
    return Promise.reject({
      status: response.status,
      error: data,
    });
  }

  return data;
});


function addToken(hdrs) {
  const headers = hdrs || {};
  const token = store.getState().auth.user.token;
  return token !== undefined ? { ...headers, Authorization: `Token ${token}` } : headers;
}

function buildOptions(inputOpts, additionalOpts) {
  const headers = addToken(inputOpts.headers);
  return {
    ...inputOpts,
    ...additionalOpts || {},
    headers,
  };
}

export default {
  fetch: function fetch(endpoint, isAuth = false, params = null, opts = {}) {
    const options = buildOptions(opts, params);
    return apiRequest.get(endpoint, options);
  },

  create: function create(endpoint, data = {}, opts = {}) {
    const options = buildOptions(opts);
    return apiRequest.post(endpoint, data, options);
  },

  update: function update(endpoint, data = {}, partial = false, opts = {}) {
    const options = buildOptions(opts);
    return partial ?
      apiRequest.patch(endpoint, data, options) :
      apiRequest.put(endpoint, data, options);
  },

  remove: function remove(endpoint, opts = {}) {
    const options = buildOptions(opts);
    return apiRequest.delete(endpoint, options);
  },

  getStaticUrl: function getStaticUrl(relPath) {
    return `${baseUrl}static/react/${relPath}`;
  },
};

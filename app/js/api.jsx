import store from './store';

const axios = require('axios');

const baseUrl = process.env.NODE_ENV === 'production' ? 'http://tachki.kg/' : 'http://92.245.109.160:1248/';
const baseAPI = 'react';
const locale = 'ru';

const baseAbsoluteUrl = `${baseUrl}${locale}/${baseAPI}`;

const apiRequest = axios.create({
  baseURL: baseAbsoluteUrl,
  headers: {
    'Accept-Language': locale,
  },
  responseType: 'json',
  withCredentials: false,
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
    return apiRequest.get(endpoint, options).then(res => res.data);
  },

  create: function create(endpoint, data = {}, opts = {}) {
    const options = buildOptions(opts);
    return apiRequest.post(endpoint, data, options).then(res => res.data);
  },

  update: function update(endpoint, data = {}, partial = false, opts = {}) {
    const options = buildOptions(opts);
    const req = partial ?
      apiRequest.patch(endpoint, data, options) :
      apiRequest.put(endpoint, data, options);

    return req.then(res => res.data);
  },

  remove: function remove(endpoint, opts = {}) {
    const options = buildOptions(opts);
    return apiRequest.delete(endpoint, options).then(res => res.data);
  },
};

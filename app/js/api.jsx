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

export default {
  fetch: function fetch(endpoint, params = null) {
    const opts = {};
    if (params !== null) {
      opts.params = params;
    }

    return apiRequest.get(endpoint, opts)
      .then(res => res.data)
      ;
  },

  create: function create(endpoint, data = {}) {
    return apiRequest.post(endpoint, data)
      .then(res => res.data)
      ;
  },

  update: function update(endpoint, data = {}, partial = false) {
    const req = partial ? apiRequest.patch(endpoint, data) : apiRequest.put(endpoint, data);
    return req.then(res => res.data);
  },

  remove: function remove(endpoint) {
    return apiRequest.delete(endpoint);
  },
};

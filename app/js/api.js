const axios = require('axios');

const baseUrl = process.env.NODE_ENV === 'production' ? 'http://tachki.kg/react/' : 'http://92.245.109.160:1248/react/';
const locale = 'ru';

const apiRequest = axios.create({
  baseURL: baseUrl,
  headers: {
    'Accept-Language': locale,
  },
  responseType: 'json',
});

export default {
  fetch: function (endpoint, params={}) {
    return apiRequest.get(endpoint, params=params)
      .then(res => res.data)
    ;
  },

  create: function (endpoint, data={}) {
    return apiRequest.post(endpoint, data=data)
      .then(res => res.data)
    ;
  },

  update: function (endpoint, data={}, partial=false) {
    const req = partial ? apiRequest.post(endpoint, data=data) : apiRequest.put(endpoint, data=data);
    return req.then(res => res.data);
  },

  remove: function (endpoint, partial=false) {
    const req = partial ? apiRequest.post(endpoint) : apiRequest.put(endpoint);
    return req.then(res => res.data);
  },
}


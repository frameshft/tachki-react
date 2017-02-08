import React from 'react';
import { createStore, combineReducers, compose } from 'redux';
import { routerReducer } from 'react-router-redux';
import reducers from './reducers';

let enhancers = [];

if (process.env.NODE_ENV !== 'production') {
  const DevTools = require('./devtools').DevTools;
  enhancers.push(DevTools.instrument());
}

export default createStore(
  combineReducers({
    routing: routerReducer,
    ...reducers,
  }),
  compose(...enhancers)
);

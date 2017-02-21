import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { routerReducer } from 'react-router-redux';
import reducers from './reducers';

const enhancers = [];

const loggerMiddleware = createLogger();

enhancers.push(applyMiddleware(thunkMiddleware, loggerMiddleware));

if (process.env.NODE_ENV !== 'production') {
  const DevTools = require('./devtools').DevTools; // eslint-disable-line global-require
  enhancers.push(DevTools.instrument());
}

export default createStore(
  combineReducers({
    routing: routerReducer,
    ...reducers,
  }),
  compose(...enhancers),
);

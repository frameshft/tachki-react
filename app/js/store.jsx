import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { routerReducer } from 'react-router-redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import reducers from './reducers';

const enhancers = [];

const loggerMiddleware = createLogger();

enhancers.push(applyMiddleware(thunkMiddleware, loggerMiddleware));
enhancers.push(autoRehydrate());

if (process.env.NODE_ENV !== 'production') {
  const DevTools = require('./devtools').DevTools; // eslint-disable-line global-require
  enhancers.push(DevTools.instrument());
}

const store = createStore(
  combineReducers({
    routing: routerReducer,
    ...reducers,
  }),
  compose(...enhancers),
);

persistStore(store, { blacklist: ['routing'] });

export default store;

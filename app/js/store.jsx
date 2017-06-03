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

let init;

try {
  init = JSON.parse(unescape(htmlDecode(__REDUX_INITIAL_DATA__))); // eslint-disable-line
} catch (e) {
  init = {};
}
const store = createStore(
  combineReducers({
    routing: routerReducer,
    ...reducers,
  }),
  init,
  compose(...enhancers),
);

persistStore(store, { blacklist: ['routing'] }).purge();

export default store;

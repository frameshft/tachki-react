import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createDevToolsWindow } from './devtools';
import store from './store';
import routes from './routes';

ReactDOM.render(
  <Provider store={ store }>
    {routes(store)}
  </Provider>, document.getElementById('app'),
);

if (process.env.NODE_ENV !== 'production') {
  createDevToolsWindow(store);
}

import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import Root from './Root.jsx';

import configureStore from './Store';
import loadInitialState from './loadInitialState';

import createDevToolsWindow from './createDevToolsWindow';

const initialState = loadInitialState();

const store = configureStore(initialState);

ReactDOM.render(
    <Provider store={store}>
        <Root store={store}/>
    </Provider>, document.getElementById('app')
);

if (process.env.NODE_ENV !== 'production') {
    createDevToolsWindow(store);
}
import {applyMiddleware, compose} from 'redux';
import {reduxReactRouter} from 'redux-router';
import thunkMiddleware from 'redux-thunk';
import createHistory from 'history/lib/createBrowserHistory';

import apiMiddleWare from './middleware/api';

export default compose(
    applyMiddleware(thunkMiddleware, apiMiddleWare),
    reduxReactRouter({createHistory})
);


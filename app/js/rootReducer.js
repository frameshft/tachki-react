import {combineReducers} from 'redux';
import {routerStateReducer} from 'redux-router';

import companiesReducer from './reducers/companiesReducer';

export default combineReducers({
    router: routerStateReducer,
    companies: companiesReducer
});

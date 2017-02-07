import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import companiesReducer from './reducers/companiesReducer';

export default combineReducers({
    routing: routerReducer,
    companies: companiesReducer
});
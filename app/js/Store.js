
import {createStore} from 'redux';
import configureStore from './configureStore';
import rootReducer from './rootReducer';

export default function (initialState) {
    return createStore(rootReducer, initialState, configureStore);
}
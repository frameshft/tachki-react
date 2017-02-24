import { combineReducers } from 'redux';
import users from './users';
import posts from './posts';


const combinedReducer = combineReducers({
  users,
  posts,
});

export default function entities(state, action) {
  return combinedReducer(state, action);
}

import { combineReducers } from 'redux';
import companies from './companies';
import automobiles from './automobiles';
import listView from './listView';
import spareParts from './spareparts';
import myPosts from './myPosts';
import favorites from './favorites';


const combinedReducer = combineReducers({
  automobiles,
  companies,
  listView,
  spareParts,
  myPosts,
  favorites,
});

export default function views(state, action) {
  return combinedReducer(state, action);
}
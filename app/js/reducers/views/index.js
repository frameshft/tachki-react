import { combineReducers } from 'redux';
import companies from './companies';
import automobiles from './automobiles';
import listView from './listView';
import spareParts from './spareparts';
import myPosts from './myPosts';
import favorites from './favorites';
import history from './history';
import services from './services';
import isShownMobileSidebar from './isShownMobileSidebar';


const combinedReducer = combineReducers({
  automobiles,
  companies,
  listView,
  spareParts,
  myPosts,
  history,
  favorites,
  services,
  isShownMobileSidebar,
});

export default function views(state, action) {
  return combinedReducer(state, action);
}

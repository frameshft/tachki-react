import { combineReducers } from 'redux';
import companies from './companies';
import automobiles from './automobiles';
import cargos from './cargos';
import listView from './listView';
import spareParts from './spareparts';
import myPosts from './myPosts';
import favorites from './favorites';
import history from './history';
import services from './services';
import isShownMobileSidebar from './isShownMobileSidebar';
import companyPosts from './companyPosts';
import faq from './faq';


const combinedReducer = combineReducers({
  automobiles,
  cargos,
  companies,
  companyPosts,
  listView,
  spareParts,
  myPosts,
  history,
  favorites,
  services,
  isShownMobileSidebar,
  faq,
});

export default function views(state, action) {
  return combinedReducer(state, action);
}

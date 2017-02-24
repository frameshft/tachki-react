import { combineReducers } from 'redux';
import companies from './companies';
import automobiles from './automobiles';
import listView from './listView';
import spareParts from './spareparts';


const combinedReducer = combineReducers({
  automobiles,
  companies,
  listView,
  spareParts,
});

export default function views(state, action) {
  return combinedReducer(state, action);
}

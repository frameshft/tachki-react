import {Map, List} from 'immutable';
import * as ClientInfoOperations from '../actions/companies';

const initialCompaniesState = Map({
  fetching: false,
  status: 0,
  next: null,
  previous: null,
  list: undefined
});

function storeCompanies(state, data) {
  state = state.update('status', () => 1);
  state = state.update('next', () => data.next);
  state = state.update('previous', () => data.previous);

  let _list = {};
  for (let l of data.results) {
    _list = {
      ..._list,
      [l.id]: l
    }
  }

  state = state.update('list', () => Map(_list));

  return state;
}

export default function companiesReducer(state, action) {

  if (state === undefined) {
    return initialCompaniesState;
  }

  switch (action.type) {
    case ClientInfoOperations.FETCH_COMPANIES_LIST:
      return storeCompanies(state, action.data);
    default:
      return state;
  }
}

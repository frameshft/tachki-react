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
  state = state.update('list', () => Map(data.results));
  return state
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

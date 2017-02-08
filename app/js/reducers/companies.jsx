import {Map, List} from 'immutable';
import * as ClientInfoOperations from '../actions/companies';

const initialCompaniesState = Map({
  fetching: false,
  status: 0,
  next: null,
  previous: null,
  list: undefined
});

function listCompanies(state, data) {
  state = state.update('status', () => 1);
  state = state.update('next', () => data.next);
  state = state.update('previous', () => data.previous);
  state = state.update('list', () => List(data.results));
  return state
}

export default function companiesReducer(state, action) {

  if (state === undefined) {
    return initialCompaniesState;
  }

  switch (action.type) {
    case ClientInfoOperations.FETCH_COMPANIES_LIST:
      return listCompanies(state, action.data);
    default:
      return state;
  }
}

import {Map} from 'immutable';
import * as ClientInfoOperations from '../actions/cars';

const initialCompaniesState = Map({
  fetching: false,
  status: 0,
  itemsPerPage: null,
  totalPages: null,
  list: undefined
});

function storeCars(state, data) {
  state = state.update('status', () => 1);
  state = state.update('itemsPerPage', () => data['per_page']);
  state = state.update('totalPages', () => data['total_pages']);

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

export default function carsReducer(state, action) {

  if (state === undefined) {
    return initialCompaniesState;
  }

  switch (action.type) {
    case ClientInfoOperations.FETCH_CARS_LIST:
      return storeCars(state, action.data);
    default:
      return state;
  }
}

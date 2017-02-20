// import {Map} from 'immutable';
import * as ClientInfoOperations from '../actions/cars';

const initialCompaniesState = {
  fetching: false,
  status: 0,
  itemsPerPage: null,
  totalPages: null,
  list: {},
  ordering: [],
};

function storeCars(state, data) {
  let list = {};
  const ordering = [];
  data.results.forEach((item) => {
    list = {
      ...state.list,
      ...list,
      [item.id]: Object.assign({}, state.list[item.id], item),
    };
    ordering.push(item.id);
  });

  return {
    ...state,
    status: 1,
    itemsPerPage: data.per_page,
    totalPages: data.total_pages,
    list,
    ordering,
  };
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

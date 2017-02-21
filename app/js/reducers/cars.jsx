import { SUCCESS_FETCH_CARS_LIST } from '../actions/list';

import storePaginatedData from './helpers/list';

const initialCompaniesState = {
  fetching: false,
  status: 0,
  itemsPerPage: null,
  totalPages: null,
  list: {},
  ordering: {},
};

export default function carsReducer(state, action) {
  if (state === undefined) {
    return initialCompaniesState;
  }

  switch (action.type) {
    case SUCCESS_FETCH_CARS_LIST:
      return storePaginatedData(state, action.data);
    default:
      return state;
  }
}

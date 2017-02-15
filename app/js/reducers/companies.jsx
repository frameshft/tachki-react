// import { Map } from 'immutable';
import * as ClientInfoOperations from '../actions/companies';

const initialCompaniesState = {
  fetching: false,
  status: 0,
  itemsPerPage: null,
  totalPages: null,
  list: undefined,
  ordering: [],
};

function storeCompanies(state, data) {
  let list = {};
  const ordering = [];
  data.results.forEach((item) => {
    list = {
      ...state.list,
      ...list,
      [item.id]: item,
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

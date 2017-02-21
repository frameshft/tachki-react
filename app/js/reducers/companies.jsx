// import * as ClientInfoOperations from '../actions/companies';
import * as CompanyProfileOperations from '../actions/companyProfile';
import { SUCCESS_FETCH_COMPANIES_LIST } from '../actions/list';

const initialCompaniesState = {
  fetching: false,
  status: 0,
  itemsPerPage: null,
  totalPages: null,
  list: {},
  ordering: {},
};

function storeCompanies(state, data) {
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
    ordering: {
      ...state.ordering,
      [data.currentPage]: ordering,
    },
  };
}

function updateCompany(state, data) {
  const company = {};
  company[data.id] = {
    ...state.list[data.id],
    ...data,
  };
  return {
    ...state,
    list: {
      ...state.list,
      ...company,
    },
    data,
  };
}


export default function companiesReducer(state, action) {
  if (state === undefined) {
    return initialCompaniesState;
  }
  switch (action.type) {
    case SUCCESS_FETCH_COMPANIES_LIST:
      return storeCompanies(state, action.data);
    case CompanyProfileOperations.FETCH_COMPANY_INFO:
      return updateCompany(state, action.data);
    default:
      return state;
  }
}

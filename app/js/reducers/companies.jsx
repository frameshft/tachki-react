import * as CompanyProfileOperations from '../actions/companyProfile';
import { SUCCESS_FETCH_COMPANIES_LIST } from '../actions/list';
import storePaginatedData from './helpers/list';

const initialCompaniesState = {
  fetching: false,
  status: 0,
  itemsPerPage: null,
  totalPages: null,
  list: {},
  ordering: {},
};

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
      return storePaginatedData(state, action.data);
    case CompanyProfileOperations.FETCH_COMPANY_INFO:
      return updateCompany(state, action.data);
    default:
      return state;
  }
}

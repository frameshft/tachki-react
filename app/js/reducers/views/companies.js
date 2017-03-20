import { SUCCESS_FETCH_COMPANIES_LIST } from '../../actions/list';
import { FETCH_COUNT_COMPANY } from '../../actions/companies';

const initialState = {
  list: [],
  totalPages: 1,
  perPage: 10,
  total: 0,
};

export default function companies(state = initialState, action) {
  switch (action.type) {
    case SUCCESS_FETCH_COMPANIES_LIST:

      return {
        ...state,
        ...action.data,
      };
    case FETCH_COUNT_COMPANY:
      return {
        ...state,
        total: action.data,
      };
    default:
      return state;
  }
}

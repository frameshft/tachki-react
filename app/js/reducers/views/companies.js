import { SUCCESS_FETCH_COMPANIES_LIST } from '../../actions/list';

const initialState = {
  list: [],
  totalPages: 1,
  perPage: 10,
};

export default function companies(state = initialState, action) {
  switch (action.type) {
    case SUCCESS_FETCH_COMPANIES_LIST:

      return {
        ...state,
        ...action.data,
      };
    default:
      return state;
  }
}

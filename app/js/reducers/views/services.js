import { SUCCESS_FETCH_SERVICES_LIST } from '../../actions/list';
import { FETCH_SERVICES_COUNT } from '../../actions/posts';

const initialState = {
  list: [],
  totalPages: 1,
  perPage: 10,
};

export default function services(state = initialState, action) {
  switch (action.type) {
    case SUCCESS_FETCH_SERVICES_LIST:
      return {
        ...state,
        ...action.data,
      };
    case FETCH_SERVICES_COUNT:
      return {
        ...state,
        total: action.data,
      };
    default:
      return state;
  }
}

import { FETCH_CARGO_LIST, SUCCESS_FETCH_CARGO_LIST } from '../../actions/list';
import { FETCH_CARGO_COUNT } from '../../actions/posts';

const initialState = {
  list: [],
  totalPages: 1,
  perPage: 10,
};

export default function cargos(state = initialState, action) {
  switch (action.type) {
    case FETCH_CARGO_LIST:
      return {
        ...state,
        isFetching: true,
      };
    case SUCCESS_FETCH_CARGO_LIST:
      return {
        ...state,
        isFetching: false,
        ...action.data,
      };
    case FETCH_CARGO_COUNT:
      return {
        ...state,
        total: action.data,
      };
    default:
      return state;
  }
}

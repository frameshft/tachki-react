import { SUCCESS_FETCH_CARS_LIST } from '../../actions/list';
import { FETCH_CARS_COUNT } from '../../actions/posts';

const initialState = {
  list: [],
  totalPages: 1,
  perPage: 10,
};

export default function automobiles(state = initialState, action) {
  switch (action.type) {
    case SUCCESS_FETCH_CARS_LIST:
      return {
        ...state,
        ...action.data,
      };
    case FETCH_CARS_COUNT:
      return {
        ...state,
        total: action.data,
      };
    default:
      return state;
  }
}

import { SUCCESS_FETCH_CARS_LIST } from '../../actions/list';

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
    default:
      return state;
  }
}

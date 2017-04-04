import { SUCCESS_FETCH_CARGO_LIST } from '../../actions/list';

const initialState = {
  list: [],
  totalPages: 1,
  perPage: 10,
};

export default function cargos(state = initialState, action) {
  switch (action.type) {
    case SUCCESS_FETCH_CARGO_LIST:
      return {
        ...state,
        ...action.data,
      };
    default:
      return state;
  }
}

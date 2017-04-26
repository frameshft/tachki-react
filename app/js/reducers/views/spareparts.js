import { SUCCESS_SPARE_PARTS_LIST } from '../../actions/list';
import { FETCH_SPAREPTS_COUNT } from '../../actions/posts';

const initialState = {
  list: [],
  totalPages: 1,
  perPage: 10,
};

export default function spareParts(state = initialState, action) {
  switch (action.type) {
    case SUCCESS_SPARE_PARTS_LIST:
      return {
        ...state,
        ...action.data,
      };
    case FETCH_SPAREPTS_COUNT:
      return {
        ...state,
        total: action.data,
      };
    default:
      return state;
  }
}

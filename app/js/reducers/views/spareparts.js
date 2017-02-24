import { SUCCESS_SPARE_PARTS_LIST } from '../../actions/list';

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
    default:
      return state;
  }
}

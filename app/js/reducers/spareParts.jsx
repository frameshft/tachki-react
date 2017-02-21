import { SUCCESS_SPARE_PARTS_LIST } from '../actions/list';
import storePaginatedData from './helpers/list';

const initialState = {
  fetching: false,
  status: 0,
  itemsPerPage: null,
  totalPages: null,
  list: {},
  ordering: {},
};

export default function sparePartsReducer(state, action) {
  if (state === undefined) {
    return initialState;
  }

  switch (action.type) {
    case SUCCESS_SPARE_PARTS_LIST:
      return storePaginatedData(state, action.data);
    default:
      return state;
  }
}

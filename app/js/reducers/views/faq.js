import { SUCCESS_FETCH_FAQ } from '../../actions/list';
import { mapToArray } from '../../utils';

const initialState = [];

export default function faq(state = initialState, action) {
  switch (action.type) {
    case SUCCESS_FETCH_FAQ:
      return mapToArray(action.data);
    default:
      return state;
  }
}

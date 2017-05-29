import { SUCCESS_FETCH_META } from '../../actions/list';

const initialState = {};

export default function faq(state = initialState, action) {
  switch (action.type) {
    case SUCCESS_FETCH_META:
      return {
        ...state,
        ...action.data,
      };
    default:
      return state;
  }
}

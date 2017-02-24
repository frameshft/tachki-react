import { GET_A_POST, STORE_A_POST } from '../../actions/posts';

export default function posts(state = {}, action) {
  switch (action.type) {
    case STORE_A_POST:
      return {
        ...state,
        ...action.data,
      };
    case GET_A_POST:
      return {
        ...state,
        [action.data.id]: action.data,
      };
    default:
      return state;
  }
}

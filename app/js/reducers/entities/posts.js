import { GET_A_POST, STORE_A_POST, MARK_POST_AS_FAVORITE, UNMARK_POST_AS_FAVORITE } from '../../actions/posts';

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
    case MARK_POST_AS_FAVORITE:
      return {
        ...state,
        [action.data]: {
          ...state[action.data],
          isFavorite: true,
        },
      };
    case UNMARK_POST_AS_FAVORITE:
      return {
        ...state,
        [action.data]: {
          ...state[action.data],
          isFavorite: false,
        },
      };
    default:
      return state;
  }
}

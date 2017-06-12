import {
  GET_A_POST, STORE_A_POST, MARK_POST_AS_FAVORITE, UNMARK_POST_AS_FAVORITE,
  REMOVE_A_POST, UP_A_POST, MAKE_POST_VIP, STORE_COMMENTS_LIST, ADD_NEW_COMMENTS,
  REMOVE_ZOMBIE_POST, FETCH_A_POST,
} from '../../actions/posts';

export default function posts(state = {}, action) {
  let newState;

  switch (action.type) {
    case FETCH_A_POST:
      return {
        ...state,
        isFetching: true,
      };
    case STORE_A_POST:
      return {
        ...state,
        ...action.data,
        isFetching: false,
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
    case REMOVE_ZOMBIE_POST:
    case REMOVE_A_POST:
      newState = { ...state };
      delete newState[action.data];
      return newState;
    case UP_A_POST:
      return {
        ...state,
        [action.data.id]: {
          ...state[action.data.id],
          uppedTime: action.data.time,
        },
      };
    case MAKE_POST_VIP:
      return {
        ...state,
        [action.data]: {
          ...state[action.data],
          isVip: true,
        },
      };
    case STORE_COMMENTS_LIST:
      return {
        ...state,
        [action.data.id]: {
          ...state[action.data.id],
          comments: action.data.comments,
        },
      };
    case ADD_NEW_COMMENTS:
      return {
        ...state,
        [action.data.id]: {
          ...state[action.data.id],
          comments: action.data.comments,
        },
      };
    default:
      return state;
  }
}

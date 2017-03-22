import { STORE_A_COMPANY, GET_A_COMPANY, GET_COMPANY_POSTS } from '../../actions/companies';

export default function users(state = {}, action) {
  switch (action.type) {
    case STORE_A_COMPANY:
      return {
        ...state,
        ...action.data,
      };
    case GET_A_COMPANY:
      return {
        ...state,
        [action.data.id]: action.data,
      };
    case GET_COMPANY_POSTS:
      return {
        ...state,
        [action.data.id]: {
          ...state[action.data.id],
          posts: action.data.posts,
        },
      };
    default:
      return state;
  }
}

import { FETCH_MY_FAVORITE_POSTS, SUCCESS_FETCH_MY_FAVORITE_POSTS } from '../../actions/list';
import { SUCESS_FETCH_SIGNOUT } from '../../actions/auth/index';

const initialState = {
  isFetched: false,
  list: [],
  totalPages: 1,
  perPage: 10,
};

export default function favorites(state = initialState, action) {
  switch (action.type) {
    case FETCH_MY_FAVORITE_POSTS:
      return {
        ...state,
        isFetched: true,
      };
    case SUCCESS_FETCH_MY_FAVORITE_POSTS:
      return {
        ...state,
        ...action.data,
        isFetched: true,
      };
    case SUCESS_FETCH_SIGNOUT:
      return initialState;
    default:
      return state;
  }
}

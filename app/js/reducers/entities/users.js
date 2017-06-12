import { STORE_A_COMPANY, GET_A_COMPANY, FETCH_A_COMPANY } from '../../actions/companies';

export default function users(state = {}, action) {
  switch (action.type) {
    case FETCH_A_COMPANY:
      return {
        ...state,
        isFetching: true,
      };
    case STORE_A_COMPANY:
      return {
        ...state,
        ...action.data,
      };
    case GET_A_COMPANY:
      return {
        ...state,
        [action.data.slug]: action.data,
        isFetching: false,
      };
    default:
      return state;
  }
}

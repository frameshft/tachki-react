import { STORE_A_COMPANY, GET_A_COMPANY } from '../../actions/companies';

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
    default:
      return state;
  }
}

import { STORE_A_COMPANY, GET_A_COMPANY } from '../../actions/companies';
import { STORE_A_CAR, GET_A_CAR } from '../../actions/cars';

export default function users(state = {}, action) {
  switch (action.type) {
    case STORE_A_CAR:
    case STORE_A_COMPANY:
      return {
        ...state,
        ...action.data,
      };
    case GET_A_CAR:
    case GET_A_COMPANY:
      return {
        ...state,
        [action.data.id]: action.data,
      };
    default:
      return state;
  }
}

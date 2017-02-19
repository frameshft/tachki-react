// import { Map } from 'immutable';
import * as CompanyProfileOperations from '../actions/companyProfile';

const initialState = {
  info: undefined
};

export default function companyProfileReducer(state, action) {
  if (state === undefined) {
    return initialState;
  }

  switch (action.type) {
    case CompanyProfileOperations.FETCH_COMPANY_INFO:
      state = state.update('info', () => action.data);
    default:
      return state;
  }
}

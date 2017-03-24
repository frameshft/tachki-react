import { GET_COMPANY_POSTS } from '../../actions/companies';

const initialState = {
  list: [],
  totalPages: 1,
  perPage: 10,
  total: 0,
};

export default function companyPosts(state = initialState, action) {
  switch (action.type) {
    case GET_COMPANY_POSTS:
      return {
        ...state,
        ...action.data,
      };
    default:
      return state;
  }
}

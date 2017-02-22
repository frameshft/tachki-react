import * as SigninOperations from '../../actions/auth';

const initialState = {
  fetching: false,
  status: 0,
  user: {},
};

function userSignin(state, data) {
  return {
    ...state,
    status: 1,
    user: data,
    fetching: false,
  };
}


export default function signinReducer(state, action) {
  if (state === undefined) {
    return initialState;
  }

  switch (action.type) {
    case SigninOperations.FETCH_SIGNIN:
      return {
        ...state,
        fetching: true,
      };
    case SigninOperations.SUCCESS_FETCH_SIGNIN:
      return userSignin(state, action.data);
    default:
      return state;
  }
}

import * as SigninOperations from '../../actions/auth';
import { SUCCESS_FETCH_MY_POSTS_LIST } from '../../actions/list';
import storePaginatedData from '../helpers/list';

const initialState = {
  fetching: false,
  status: 0,
  user: {
    posts: {
      list: {},
      ordering: {},
    },
  },
};

function user(state, data) {
  return {
    ...state,
    status: 1,
    user: {
      ...state.user,
      ...data,
    },
    fetching: false,
  };
}

function userRegistration(state) {
  return {
    ...state,
    status: 201,
  };
}

function forgotPassword(state) {
  return {
    ...state,
    status: 200,
  };
}

function storeMyPosts(state, data) {
  return {
    ...state,
    user: {
      ...state.user,
      posts: storePaginatedData(state.user.posts, data),
    },
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
      return user(state, action.data);
    case SUCCESS_FETCH_MY_POSTS_LIST:
      return storeMyPosts(state, action.data);
    case SigninOperations.SUCCESS_FETCH_REGISTRATION:
      return userRegistration(state);
    case SigninOperations.SUCCESS_FETCH_ACTIVATION:
      return user(state, action.data);
    case SigninOperations.SUCCESS_FETCH_FORGOT_PASSWORD:
      return forgotPassword(state);
    case SigninOperations.SUCCESS_FETCH_CHANGE_PASSWORD:
      return user(state, action.data);
    case SigninOperations.SUCESS_FETCH_SIGNOUT:
      return initialState;
    default:
      return state;
  }
}

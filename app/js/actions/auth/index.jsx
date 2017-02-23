import API from '../../api';

export const FETCH_SIGNIN = 'FETCH_SIGNIN';
export const SUCCESS_FETCH_SIGNIN = 'SUCCESS_FETCH_SIGNIN';
export const FAILURE_FETCH_SIGNIN = 'FAILURE_FETCH_SIGNIN';

export const FETCH_REGISTRATION = 'FETCH_REGISTRATION';
export const SUCCESS_FETCH_REGISTRATION = 'SUCCESS_FETCH_REGISTRATION';
export const FAILURE_FETCH_REGISTRATION = 'FAILURE_FETCH_REGISTRATION';

export const FETCH_ACTIVATION = 'FETCH_ACTIVATION';
export const SUCCESS_FETCH_ACTIVATION = 'SUCCESS_FETCH_ACTIVATION';
export const FAILURE_FETCH_ACTIVATION = 'FAILURE_FETCH_ACTIVATION';

export const FETCH_FORGOT_PASSWORD = 'FETCH_FORGOT_PASSWORD';
export const SUCCESS_FETCH_FORGOT_PASSWORD = 'SUCCESS_FETCH_FORGOT_PASSWORD';
export const FAILURE_FETCH_FORGOT_PASSWORD = 'FAILURE_FETCH_FORGOT_PASSWORD';

export const FETCH_CHANGE_PASSWORD = 'FETCH_CHANGE_PASSWORD';
export const SUCCESS_FETCH_CHANGE_PASSWORD = 'SUCCESS_FETCH_CHANGE_PASSWORD';
export const FAILURE_FETCH_CHANGE_PASSWORD = 'FAILURE_FETCH_CHANGE_PASSWORD';

export const FETCH_SIGNOUT = 'FETCH_SIGNOUT';
export const SUCESS_FETCH_SIGNOUT = 'SUCESS_FETCH_SIGNOUT';
export const FAILURE_FETCH_SIGNOUT = 'FAILURE_FETCH_SIGNOUT';

function forgotPasswordAction(data) {
  return {
    type: SUCCESS_FETCH_FORGOT_PASSWORD,
    ...data,
  };
}

export function signin(credentials) {
  return dispatch =>
    API.create('/sign-in/', credentials)
      .then((res) => {
        const data = {
          ...res,
        };

        return dispatch(
          {
            type: SUCCESS_FETCH_SIGNIN,
            data,
          },
        );
      })
    ;
}

export function registration(credentials) {
  return dispatch =>
    API.create('/sign-up/', credentials)
      .then((res) => {
        const data = {
          ...res,
        };

        return dispatch(
          {
            type: SUCCESS_FETCH_REGISTRATION,
            data,
          },
        );
      })
    ;
}

export function activation(credentials) {
  return dispatch =>
    API.create('/activate/', credentials)
      .then((res) => {
        const data = {
          ...res,
        };

        return dispatch(
          {
            type: SUCCESS_FETCH_ACTIVATION,
            data,
          },
        );
      })
    ;
}

export function forgotPassword(credentials) {
  return dispatch =>
    API.create('/forgot-password/', credentials)
      // .then(
      //   sauce => dispatch(makeASandwich(forPerson, sauce)),
      //   error => dispatch(apologize('The Sandwich Shop', forPerson, error))
      // )
      .then(
        res => dispatch(forgotPasswordAction(res)),
      )
    ;
}

export function changePassword(credentials) {
  return dispatch =>
    API.create('/create-password/', credentials)
      .then((res) => {
        const data = {
          ...res,
        };

        return dispatch(
          {
            type: SUCCESS_FETCH_CHANGE_PASSWORD,
            data,
          },
        );
      })
    ;
}

export function signOut() {
  return dispatch =>
    API.create('/sign-out/', {}, true)
      .then(() => dispatch({
        type: SUCESS_FETCH_SIGNOUT,
      }),
      );
}

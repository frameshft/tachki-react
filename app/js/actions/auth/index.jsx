import API from '../../api';

export const FETCH_SIGNIN = 'FETCH_SIGNIN';
export const SUCCESS_FETCH_SIGNIN = 'SUCCESS_FETCH_SIGNIN';
export const FAILURE_FETCH_SIGNIN = 'FAILURE_FETCH_SIGNIN';

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

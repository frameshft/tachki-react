import API from '../api';

export const STORE_A_COMPANY = 'STORE_A_COMPANY';
export const GET_A_COMPANY = 'GET_A_COMPANY';
export const REMOVE_A_COMPANY = 'REMOVE_A_COMPANY';
export const FETCH_COUNT_COMPANY = 'FETCH_COUNT_COMPANY';
export const GET_COMPANY_POSTS = 'GET_COMPANY_POSTS';


export function getCompany(companyId) {
  return dispatch =>
    API.fetch(`/companies/${companyId}/`)
      .then((data) => {
        const { breadcrumbs, title, description } = data;
        dispatch({
          type: 'SUCCESS_FETCH_META',
          data: { breadcrumbs, title, description },
        });
        return dispatch({ type: GET_A_COMPANY, data });
      });
}

import API from '../api';

export const STORE_A_COMPANY = 'STORE_A_COMPANY';
export const GET_A_COMPANY = 'GET_A_COMPANY';
export const REMOVE_A_COMPANY = 'REMOVE_A_COMPANY';


export function getCompany(companyId) {
  return dispatch =>
    API.fetch(`/companies/${companyId}/`)
      .then(data => dispatch({ type: GET_A_COMPANY, data }));
}

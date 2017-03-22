import API from '../api';
import { listToMap } from '../utils';
import { STORE_A_POST } from './posts';

export const STORE_A_COMPANY = 'STORE_A_COMPANY';
export const GET_A_COMPANY = 'GET_A_COMPANY';
export const REMOVE_A_COMPANY = 'REMOVE_A_COMPANY';
export const FETCH_COUNT_COMPANY = 'FETCH_COUNT_COMPANY';
export const GET_COMPANY_POSTS = 'GET_COMPANY_POSTS';


export function getCompany(companyId) {
  return dispatch =>
    API.fetch(`/companies/${companyId}/`)
      .then(data => dispatch({ type: GET_A_COMPANY, data }));
}

export function fetchCompaniesCount() {
  return dispatch =>
    API.fetch('/companies/count/')
      .then(data => dispatch({ type: FETCH_COUNT_COMPANY, data }));
}

export function getCompaniyPosts(companyId) {
  return dispatch =>
    API.fetch(`/companies/${companyId}/posts/`)
      .then((data) => {
        const ids = data.map(x => x.id);
        const posts = listToMap(data);
        dispatch({ type: STORE_A_POST, data: posts });
        dispatch({ type: GET_COMPANY_POSTS,
          data: {
            id: companyId,
            posts: ids,
          },
        });
      });
}

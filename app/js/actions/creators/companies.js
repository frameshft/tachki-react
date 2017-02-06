import {CALL_API} from '../../middleware/api';
import * as Actions from '../companies';

export function fetchCompanies() {
    return (dispatch) => dispatch({
        type: Actions.FETCH_COMPANIES_LIST,
        [CALL_API]: {
            endpoint: `http://92.245.109.160:1248/en/react/companies/`,
            method: 'get',
            types: [Actions.SUCCESS_FETCH_COMPANIES_LIST, Actions.FAILURE_FETCH_COMPANIES_LIST],
            credentials: true
        }
    });
}

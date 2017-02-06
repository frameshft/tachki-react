import {Map} from 'immutable';
import * as ClientInfoOperations from '../actions/companies';

const initialState = Map({
    fetching: false,
    status: 0,
    list: undefined
});

export default function companiesReducer (companies, action) {
    if (companies === undefined) {
        return initialState;
    }

    switch (action.type) {
        case ClientInfoOperations.FETCH_COMPANIES_LIST:
            companies = initialState;
            companies = companies.update('fetching', () => true);
            break;

        case ClientInfoOperations.SUCCESS_FETCH_COMPANIES_LIST:
            companies = companies.update('fetching', () => false);

            if (action.data.Error) {
                companies = companies.update('status', () => action.data.Error);
            } else {
                companies = companies.update('status', () => 1);
                companies = companies.update('list', () => Map(action.data));
            }
            break;
    }

    return companies;
}

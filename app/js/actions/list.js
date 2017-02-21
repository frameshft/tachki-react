import API from '../api';

export const FETCH_PAGINATED_RESPONSE = 'FETCH_PAGINATED_RESPONSE';
export const FAILURE_FETCH_PAGINATED_RESPONSE = 'FAILURE_FETCH_PAGINATED_RESPONSE';

export const FETCH_CARS_LIST = 'FETCH_CARS_LIST';
export const SUCCESS_FETCH_CARS_LIST = 'SUCCESS_FETCH_CARS_LIST';
export const FAILURE_FETCH_CARS_LIST = 'FAILURE_FETCH_CARS_LIST';

export const FETCH_COMPANIES_LIST = 'FETCH_COMPANIES_LIST';
export const SUCCESS_FETCH_COMPANIES_LIST = 'SUCCESS_FETCH_COMPANIES_LIST';
export const FAILURE_FETCH_COMPANIES_LIST = 'FAILURE_FETCH_COMPANIES_LIST';

export const FETCH_SPARE_PARTS_LIST = 'FETCH_SPARE_PARTS_LIST';
export const SUCCESS_SPARE_PARTS_LIST = 'SUCCESS_SPARE_PARTS_LIST';
export const FAILURE_SPARE_PARTS_LIST = 'FAILURE_SPARE_PARTS_LIST';

function requestPaginatedResponse() {
  return {
    type: FETCH_PAGINATED_RESPONSE,
    isFetching: true,
  };
}


function receivePaginatedResponse(actionType, data) {
  return {
    type: actionType,
    data,
  };
}


export function fetchPaginatedResponse(actionType, endpoint, page = 1) {
  return (dispatch) => {
    dispatch(requestPaginatedResponse());
    return API.fetch(`${endpoint}?page=${page}`)
      .then((res) => {
        const data = {
          ...res,
          currentPage: page,
        };

        return dispatch(receivePaginatedResponse(actionType, data));
      });
  };
}

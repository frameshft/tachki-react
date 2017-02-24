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

export const FETCH_MY_POSTS_LIST = 'FETCH_MY_POSTS_LIST';
export const SUCCESS_FETCH_MY_POSTS_LIST = 'SUCCESS_FETCH_MY_POSTS_LIST';
export const FAILURE_FETCH_MY_POSTS_LIST = 'FAILURE_FETCH_MY_POSTS_LIST';

function requestPaginatedResponse() {
  return {
    type: FETCH_PAGINATED_RESPONSE,
    isFetching: true,
  };
}

function parsePaginatedData(data) {
  let objects = {};
  const list = [];

  data.results.forEach((item) => {
    objects = {
      ...objects,
      [item.id]: Object.assign({}, item),
    };
    list.push(item.id);
  });

  return {
    objects,
    results: {
      list,
      perPage: data.per_page,
      totalPages: data.total_pages,
    },
  };
}


export function fetchPaginatedResponse(actions, endpoint, page = 1, isAuth = false) {
  return (dispatch) => {
    dispatch(requestPaginatedResponse());
    return API.fetch(`${endpoint}/?page=${page}`, isAuth)
      .then((res) => {
        const { objects, results } = parsePaginatedData(res);
        return Promise.all([
          dispatch({ type: actions.entities, data: objects }),
          dispatch({ type: actions.component, data: results }),
        ]);
      });
  };
}

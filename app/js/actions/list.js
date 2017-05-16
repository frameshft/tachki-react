import API from '../api';

export const FETCH_PAGINATED_RESPONSE = 'FETCH_PAGINATED_RESPONSE';
export const FAILURE_FETCH_PAGINATED_RESPONSE = 'FAILURE_FETCH_PAGINATED_RESPONSE';

export const FETCH_CARS_LIST = 'FETCH_CARS_LIST';
export const SUCCESS_FETCH_CARS_LIST = 'SUCCESS_FETCH_CARS_LIST';
export const FAILURE_FETCH_CARS_LIST = 'FAILURE_FETCH_CARS_LIST';

export const FETCH_SERVICES_LIST = 'FETCH_SERVICES_LIST';
export const SUCCESS_FETCH_SERVICES_LIST = 'SUCCESS_FETCH_SERVICES_LIST';
export const FAILURE_FETCH_SERVICES_LIST = 'FAILURE_FETCH_SERVICES_LIST';

export const FETCH_CARGO_LIST = 'FETCH_CARGO_LIST';
export const SUCCESS_FETCH_CARGO_LIST = 'SUCCESS_FETCH_CARGO_LIST';
export const FAILURE_FETCH_CARGO_LIST = 'FAILURE_FETCH_CARGO_LIST';

export const FETCH_COMPANIES_LIST = 'FETCH_COMPANIES_LIST';
export const SUCCESS_FETCH_COMPANIES_LIST = 'SUCCESS_FETCH_COMPANIES_LIST';
export const FAILURE_FETCH_COMPANIES_LIST = 'FAILURE_FETCH_COMPANIES_LIST';

export const FETCH_SPARE_PARTS_LIST = 'FETCH_SPARE_PARTS_LIST';
export const SUCCESS_SPARE_PARTS_LIST = 'SUCCESS_SPARE_PARTS_LIST';
export const FAILURE_SPARE_PARTS_LIST = 'FAILURE_SPARE_PARTS_LIST';

export const FETCH_MY_POSTS_LIST = 'FETCH_MY_POSTS_LIST';
export const SUCCESS_FETCH_MY_POSTS_LIST = 'SUCCESS_FETCH_MY_POSTS_LIST';
export const FAILURE_FETCH_MY_POSTS_LIST = 'FAILURE_FETCH_MY_POSTS_LIST';

export const FETCH_MY_FAVORITE_POSTS = 'FETCH_MY_FAVORITE_POSTS';
export const SUCCESS_FETCH_MY_FAVORITE_POSTS = 'SUCCESS_FETCH_MY_FAVORITE_POSTS';
export const FAILURE_FETCH_MY_FAVORITE_POSTS = 'FAILURE_FETCH_MY_FAVORITE_POSTS';

export const SUCCESS_FETCH_FAQ = 'SUCCESS_FETCH_FAQ';

export const CLEAR_HISTORY_POST = 'CLEAR_HISTORY_POST';

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


export function fetchPaginatedResponse(actions, endpoint, page = 1) {
  return (dispatch) => {
    dispatch(requestPaginatedResponse());
    if (actions.fetching !== undefined) {
      dispatch({ type: actions.fetching });
    }
    if (actions.get !== undefined) {
      dispatch({ type: actions.get });
    }
    let parsedEndpoint;
    const pageParam = endpoint.indexOf('page=') > -1 ? '' : `page=${page}`;
    if (pageParam.length > 0) {
      parsedEndpoint = endpoint.indexOf('?') > -1 ? `${endpoint}&${pageParam}` : `${endpoint}?${pageParam}`;
    } else {
      parsedEndpoint = endpoint;
    }

    return API.fetch(parsedEndpoint)
      .then((res) => {
        const { objects, results } = parsePaginatedData(res);
        return Promise.all([
          dispatch({ type: actions.entities, data: objects }),
          dispatch({ type: actions.component, data: results }),
        ]);
      });
  };
}


export function fetchFAQ() {
  return dispatch => API.fetch('/faq/').then(data => dispatch({ type: SUCCESS_FETCH_FAQ, data }));
}

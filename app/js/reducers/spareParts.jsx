import * as SparePartsOperations from '../actions/spareParts';

const initialState = {
  fetching: false,
  status: 0,
  itemsPerPage: null,
  totalPages: null,
  list: {},
  ordering: {},
};

function storeParts(state, data) {
  let list = {};
  const ordering = [];
  data.results.forEach((item) => {
    list = {
      ...state.list,
      ...list,
      [item.id]: Object.assign({}, state.list[item.id], item),
    };
    ordering.push(item.id);
  });

  return {
    ...state,
    status: 1,
    itemsPerPage: data.per_page,
    totalPages: data.total_pages,
    list,
    ordering: {
      ...state.ordering,
      [data.currentPage]: ordering,
    },
  };
}

export default function sparePartsReducer(state, action) {
  if (state === undefined) {
    return initialState;
  }

  switch (action.type) {
    case SparePartsOperations.FETCH_SPARE_PARTS_LIST:
      return storeParts(state, action.data);
    default:
      return state;
  }
}

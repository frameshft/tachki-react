export default function storePaginatedData(state, data) {
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

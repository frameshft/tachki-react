const initialState = {
  path: '/',
  query: '',
};


export default function (state = initialState, action) {
  let path;
  switch (action.type) {
    case '@@router/LOCATION_CHANGE':
      path = action.payload.pathname;

      if (path !== '/') {
        path = path.replace(/\/+$/, '');
      }

      return {
        path,
        query: action.payload.search,
      };
    default:
      return state;
  }
}

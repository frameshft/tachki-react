import { ADD_HISTORY_POST, CLEAR_HISTORY_POST } from '../../actions/list';

const historyLength = 20;

const initialState = {
  list: [],
};

const pushToHistoryList = (list, id) => {
  // Get a new list without the pushed Post ID
  const newList = list.filter(x => x !== id);
  // Append the Post ID to the start of the list
  newList.unshift(id);
  // Control the size of the history list
  if (newList.length > historyLength) {
    newList.pop();
  }

  return newList;
};

export default function history(state = initialState, action) {
  switch (action.type) {
    case '@@router/LOCATION_CHANGE':
      return {
        ...state,
        list: state.list,
      };
    case ADD_HISTORY_POST:
      return {
        ...state,
        list: pushToHistoryList(state.list, action.data),
      };
    case CLEAR_HISTORY_POST:
      return initialState;
    default:
      return state;
  }
}

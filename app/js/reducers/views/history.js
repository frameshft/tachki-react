import { CLEAR_HISTORY_POST } from '../../actions/list';

const historyLength = 20;

const trackPaths = [
  'automobiles',
  'spare-parts',
  'cargo',
  'services',
];

const initialState = {
  list: [],
};

function pushHistory(list, path) {
  const splitPath = path.split('/');

  if (splitPath.length === 3 && /^[0-9]+$/.test(splitPath[2]) && trackPaths.includes(splitPath[1])) {
    const elem = +splitPath[2];
    const newList = list.filter(x => x !== elem);

    newList.unshift(elem);

    if (newList.length > historyLength) {
      newList.pop();
    }

    return newList;
  }

  return list;
}

export default function history(state = initialState, action) {
  switch (action.type) {
    case '@@router/LOCATION_CHANGE':
      return {
        ...state,
        list: pushHistory(state.list, action.payload.pathname),
      };
    case CLEAR_HISTORY_POST:
      return initialState;
    default:
      return state;
  }
}

import LIST_VIEW_TYPE from '../actions/listView';
import * as listViewType from '../constants/listView';

const initialState = {
  listView: listViewType.LIST_VIEW_NORMAL,
};

export default function listView(state = initialState, action) {
  switch (action.type) {
    case LIST_VIEW_TYPE:
      return {
        ...state,
        listView: action.data,
      };
    default:
      return state;
  }
}

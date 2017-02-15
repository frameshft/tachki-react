import { Map } from 'immutable';
import { LIST_VIEW_TYPE } from '../actions/listView';
import * as listViewType from '../constants/listView';

const initialState = Map({
  listView: listViewType.LIST_VIEW_NORMAL,
});

export default function (state = initialState, action) {
  switch (action.type) {
    case LIST_VIEW_TYPE:
      return state.update('listView', () => action.data);
    default:
      return state;
  }
}

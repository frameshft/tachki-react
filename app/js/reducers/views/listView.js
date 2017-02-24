import LIST_VIEW_TYPE from '../../actions/listView';
import { LIST_VIEW_NORMAL } from '../../constants/listView';

export default function listView(state = LIST_VIEW_NORMAL, action) {
  switch (action.type) {
    case LIST_VIEW_TYPE:
      return action.data;
    default:
      return state;
  }
}

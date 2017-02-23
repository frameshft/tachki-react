import { ADD_VIEWED_POSTS } from '../actions/posts.viewed';

const initialState = {
  ordering: [],
  list: {},
};

const maxCount = 20;

function getStateWithViewedPost(state, post) {
  const ordering = state.ordering;
  const list = state.list;
  const duplicateEl = ordering.indexOf(post.id);

  if (duplicateEl !== -1) {
    ordering.splice(duplicateEl, 1);
  }

  ordering.unshift(post.id);

  if (ordering.length >= maxCount) {
    delete list[ordering.pop()];
  }

  return {
    ...state,
    ordering,
    list: {
      ...list,
      [post.id]: post,
    },
  };
}

export default function viewedPostsReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_VIEWED_POSTS:
      return getStateWithViewedPost(state, action.data);
    default:
      return state;
  }
}

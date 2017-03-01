import API from '../api';

export const STORE_A_POST = 'STORE_A_POST';
export const GET_A_POST = 'GET_A_POST';
export const REMOVE_A_POST = 'REMOVE_A_POST';
export const MARK_POST_AS_FAVORITE = 'MARK_POST_AS_FAVORITE';
export const UNMARK_POST_AS_FAVORITE = 'UNMARK_POST_AS_FAVORITE';


export function markPostAsFavorite(postId) {
  return dispatch => API.create(`/posts/${postId}/favorite/`)
    .then(() => dispatch({ type: MARK_POST_AS_FAVORITE, data: postId }))
  ;
}

export function unMarkPostAsFavorite(postId) {
  return dispatch =>
    API.create(`/posts/${postId}/favorite/`)
      .then(() =>
        dispatch({ type: UNMARK_POST_AS_FAVORITE, data: postId }))
    ;
}

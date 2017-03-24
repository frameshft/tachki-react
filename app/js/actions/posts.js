import API from '../api';
import { UPDATE_USER_BALANCE } from './auth';

export const STORE_A_POST = 'STORE_A_POST';
export const GET_A_POST = 'GET_A_POST';
export const REMOVE_A_POST = 'REMOVE_A_POST';
export const REMOVE_ZOMBIE_POST = 'REMOVE_ZOMBIE_POST';
export const UP_A_POST = 'UP_A_POST';
export const MARK_POST_AS_FAVORITE = 'MARK_POST_AS_FAVORITE';
export const UNMARK_POST_AS_FAVORITE = 'UNMARK_POST_AS_FAVORITE';
export const MAKE_POST_VIP = 'MAKE_POST_VIP';
export const STORE_COMMENTS_LIST = 'STORE_COMMENTS_LIST';
export const ADD_NEW_COMMENTS = 'ADD_NEW_COMMENTS';


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

export function deletePost(postId) {
  return dispatch =>
    API.create(`/posts/${postId}/delete/`)
      .then(() => dispatch({ type: REMOVE_A_POST, data: postId }))
    ;
}

export function getPost(postType, postId) {
  return dispatch =>
    API.fetch(`/${postType}/${postId}/`)
      .then(res => dispatch({ type: STORE_A_POST, data: { [res.id]: res } }));
}

export function votePostUp(postId) {
  return dispatch =>
    API.create(`/posts/${postId}/up/`)
      .then((res) => {
        dispatch({
          type: UP_A_POST, data: { id: postId, time: res },
        });
        return res;
      })
    ;
}

export function makePostVIP(postId) {
  return dispatch =>
    API.create(`/posts/${postId}/vip/`)
      .then(res => Promise.all([
        dispatch({ type: MAKE_POST_VIP, data: postId }),
        dispatch({ type: UPDATE_USER_BALANCE, data: res }),
      ]))
      .catch((err) => {
        let message = '';
        if (err.status === 400) {
          if (err.error === 'insufficient-funds') {
            message = 'Недостаточно средств';
          } else {
            message = 'Ошибка на стороне сервера';
          }
        }
        // TODO handle error in component
        return message;
      })
    ;
}

export function fetchComments(postId) {
  return dispatch =>
    API.fetch(`/posts/${postId}/comments/`)
      .then(comments => dispatch({ type: STORE_COMMENTS_LIST, data: { id: postId, comments } }))
  ;
}

export function postComments(post, description, comment = null) {
  const data = {
    post,
    description,
  };

  if (comment !== null) {
    data.comment = comment;
  }

  return dispatch =>
    API.create('/comments/', data)
      .then(comments => dispatch({ type: STORE_COMMENTS_LIST, data: { id: post, comments } }))
  ;
}

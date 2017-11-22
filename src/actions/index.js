import * as cx from './constants';

export function getUsers() {
  return { type: cx.GET_USERS };
}

export function getPosts() {
  return { type: cx.GET_POSTS };
}

export function getAlbums() {
  return { type: cx.GET_ALBUMS };
}

export function deleteCollection(payload) {
  return { type: cx.DELETE_COLLECTION, payload };
}

export function updatePostTitle(payload) {
  return { type: cx.UPDATE_POST_TITLE, payload };
}


import { takeLatest } from 'redux-saga/effects';
import { apiClient, async } from '../helpers';

import * as cx from '../actions/constants';

const getPosts = async.apiCall({
  type: cx.GET_POSTS,
  method: apiClient.get,
  path: () => '/posts',
  success: res => res.data,
});

export default function* rootSaga() {
  yield takeLatest(cx.GET_POSTS, getPosts);
}
